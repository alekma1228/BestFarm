/*****************************************************************

Inserting new rows into FHT table that are were loaded into
the Hist table, but not yet to FHT

Step 1: Get date diff between Hist and FHT
Step 2: Create single row FHT input rows from Hist comb floor/elec
Step 3: Insert single rows into Temp_FHT table

Step 4: In FHT table, remove rows with 0 OI prior to 
existing SF_CMYYYY_ID with >0 OI date

Step 5: In FHT table, Remove rows with 0 OI for SF_CMYYYY_ID's 
where sum(OI) = 0 (all rows)

Step 6: Row Number forward/reverse, update FHT table

*****************************************************************/


/*************************************************
Step 1:
Get FILE_DATEs being inserted right now
that are in history table but not in the FHT table
*************************************************/

-- Get file dates from Hist file table
drop table if exists TMP_HIST_FILE_DTS;
CREATE  TABLE TMP_HIST_FILE_DTS (
    FILE_DATE                   DATE NOT NULL ,
	PRIMARY KEY (FILE_DATE) 
)
ENGINE = InnoDB;

INSERT INTO TMP_HIST_FILE_DTS
select BizDt as FILE_DATE 
from cme_rawfiledata A
group by 1
;


-- Get File dates from FHT table
drop table if exists TMP_FHT_FILE_DTS;
CREATE  TABLE TMP_FHT_FILE_DTS (
    FILE_DATE                   DATE NOT NULL ,
	PRIMARY KEY (FILE_DATE) 
)
ENGINE = InnoDB;
INSERT INTO TMP_FHT_FILE_DTS
select FILE_DATE 
from TA_F_FuturesHistoryTgt
group by 1
;

-- Create file table of Hist dates not in FHT
drop table if exists TMP_FILE_DT_NOT_IN_FHT;
CREATE  TABLE TMP_FILE_DT_NOT_IN_FHT (
    FILE_DATE                   DATE NOT NULL ,
	PRIMARY KEY (FILE_DATE) 
)
ENGINE = InnoDB;

INSERT INTO TMP_FILE_DT_NOT_IN_FHT

select A.FILE_DATE 
from TMP_HIST_FILE_DTS A
left join TMP_FHT_FILE_DTS B
on A.FILE_DATE = B.FILE_DATE
where
B.FILE_DATE is null

order by 1
;

drop table TMP_HIST_FILE_DTS;
drop table TMP_FHT_FILE_DTS;

-- Testing queries
-- select count(distinct FILE_DATE) from TA_F_RawFileData;
-- select count(*) from TMP_FILE_DT_NOT_IN_FHT;
-- select * from TMP_FILE_DT_NOT_IN_FHT


/*************************************************
Step 2:
Get 'best' row from floor & electronic traded
for the same day by taking max(FILE_OPTCODE), 
which gives you the floor if it exists, then
electronic if it doesn't exist.  Does not use
the Jul 6, 2015 date as an identifier here
*************************************************/

drop table if exists TMP_FHT_SINGLE_ROWS_STRT;
CREATE  TABLE TMP_FHT_SINGLE_ROWS_STRT (
    FILE_DATE                   DATE NOT NULL ,
	OptCode_Futures_TA			VARCHAR(10) NOT NULL,
	OptCode_Futures_TA_E		VARCHAR(11) NOT NULL,
	GenericSymbol             	VARCHAR(20) NOT NULL ,
	CommodityMonthID 			INTEGER NOT NULL,
	CommoditySymbol             VARCHAR(5) NOT NULL ,
	MonthSymbol                 VARCHAR(3) NULL ,
	MonthID 					SMALLINT NOT NULL ,
	YearSymbol					SMALLINT NOT NULL,

	PRIMARY KEY (FILE_DATE, OptCode_Futures_TA),
	INDEX(FILE_DATE, OptCode_Futures_TA_E) 
)
ENGINE = InnoDB;

-- First insert all possible date / optcode combos in a table
INSERT INTO TMP_FHT_SINGLE_ROWS_STRT

select
A.FILE_DATE

,B.OptCode_Futures_TA
,B.OptCode_Futures_TA_E
,B.GenericSymbol
,B.CommodityMonthID
,B.CommoditySymbol
,B.MonthSymbol
,B.MonthID
,B.YearSymbol

from 
TMP_FILE_DT_NOT_IN_FHT A
,Setup_OptCodeMap_Futures B

where
MonthID <= 12
;


drop table if exists TMP_FHT_SINGLE_ROWS;
CREATE  TABLE TMP_FHT_SINGLE_ROWS (
    FILE_DATE                   DATE NOT NULL ,
	FILE_OPTCODE                VARCHAR(20) NOT NULL ,

	GenericSymbol             	VARCHAR(20) NOT NULL ,
	CommodityMonthID 			INTEGER NOT NULL,
	CommoditySymbol             VARCHAR(5) NOT NULL ,
	MonthSymbol                 VARCHAR(3) NULL ,
	MonthID 					SMALLINT NOT NULL ,
	YearSymbol					SMALLINT NOT NULL,

	PRIMARY KEY (FILE_OPTCODE, FILE_DATE) 
)
ENGINE = InnoDB;


-- Next filter down to actual optcodes in the history table for those dates
INSERT INTO TMP_FHT_SINGLE_ROWS

select
A.FILE_DATE

,case
	when A.FILE_DATE <= '2015-07-06' then coalesce(B1.FILE_OPTCODE, B2.FILE_OPTCODE)
	else coalesce(B2.FILE_OPTCODE, B1.FILE_OPTCODE)
	end as FILE_OPTCODE

,A.GenericSymbol
,A.CommodityMonthID
,A.CommoditySymbol
,A.MonthSymbol
,A.MonthID
,A.YearSymbol 

from TMP_FHT_SINGLE_ROWS_STRT A

left outer join TA_F_RawFileData B1
on A.FILE_DATE = B1.FILE_DATE
and A.OptCode_Futures_TA = B1.FILE_OPTCODE

left outer join TA_F_RawFileData B2
on A.FILE_DATE = B2.FILE_DATE
and A.OptCode_Futures_TA_E = B2.FILE_OPTCODE

where
B1.FILE_OPTCODE is not null
or B2.FILE_OPTCODE is not null
;


-- drop the temporary starter table
drop table TMP_FHT_SINGLE_ROWS_STRT;





/**********************************************************
Step 3:
Insert new rows into FHT TEMP Table
**********************************************************/

drop table if exists FHT_TMP;
CREATE  TABLE FHT_TMP (
	FILE_OPTCODE                VARCHAR(20) NOT NULL ,
    FILE_DATE                   DATE NOT NULL ,
    FILE_OPEN                   DECIMAL(24,12) NOT NULL ,
    FILE_HIGH                   DECIMAL(24,12) NOT NULL ,
    FILE_LOW                    DECIMAL(24,12) NOT NULL ,
    FILE_CLOSE                  DECIMAL(24,12) NOT NULL ,
    FILE_VOLUME                 DECIMAL(24,12) NOT NULL ,
    FILE_OPEN_INT               DECIMAL(24,12) NOT NULL ,

	CommodityMonthID 			INTEGER NOT NULL,
	CommoditySymbol             VARCHAR(5) NOT NULL ,
	MonthSymbol                 VARCHAR(3) NULL ,
	MonthID 					SMALLINT NOT NULL ,

	Futures_YearNbr				SMALLINT NOT NULL,
	SF_CMYYYY_ID				VARCHAR(15) NOT NULL,
	RowAddDate					DATE NOT NULL,

	ModelEvalStartDate			DATE NULL,
	ModelEvalEndDate			DATE NULL,
	ModelEvalRecord				INTEGER NULL,
	ModelEvalCropYear			SMALLINT NULL,

	SF_CMYYYY_ID_RowNbr			SMALLINT NOT NULL DEFAULT 0,
-- 	SF_CMYYYY_ID_RowNbrRvrs		SMALLINT NOT NULL,

	PRIMARY KEY (FILE_OPTCODE, FILE_DATE),
	INDEX (SF_CMYYYY_ID, FILE_DATE),
	INDEX(CommodityMonthID, CommoditySymbol)
)
ENGINE = InnoDB;



INSERT INTO FHT_TMP

select
A.FILE_OPTCODE
,A.FILE_DATE
,A.FILE_OPEN
,A.FILE_HIGH
,A.FILE_LOW
,A.FILE_CLOSE
,A.FILE_VOLUME
,A.FILE_OPEN_INT

,B.CommodityMonthID
,B.CommoditySymbol
,B.MonthSymbol
,B.MonthID


,@Futures_YearNbr := case
    when B.MonthID > 12 then 0
    when (B.YearSymbol >= right(year(A.FILE_DATE), 1)) then (year(A.FILE_DATE) + B.YearSymbol- right(year(A.FILE_DATE), 1))
    else (year(A.FILE_DATE) + 10.0 + B.YearSymbol- right(year(A.FILE_DATE), 1) )
    end as Futures_YearNbr

,case
    when B.MonthID <= 12 then concat(B.CommoditySymbol, B.MonthSymbol, @Futures_YearNbr)
    else concat(B.CommoditySymbol, B.MonthSymbol)
    end as SF_CMYYYY_ID

,CurDate() as RowAddDate

-- Model evaluation date record info
,@ModelEvalStartDate := cast(concat(@Futures_YearNbr+C.StartYearAdj,'-',C.Startmonth,'-',C.StartDay)as date) ModelEvalStartDate
,@ModelEvalEndDate := cast(concat(@Futures_YearNbr+C.EndYearAdj,'-',C.Endmonth,'-',C.EndDay) as date) ModelEvalEndDate
,case 
	when A.FILE_DATE is null then 0
	when A.FILE_DATE between @ModelEvalStartDate and @ModelEvalEndDate then 1 
	else 0 
end as ModelEvalRecord
,@Futures_YearNbr + CropYearAdj as ModelEvalCropYear


,0 as SF_CMYYYY_ID_RowNbr			
-- ,0 as SF_CMYYYY_ID_RowNbrRvrs		


from TA_F_RawFileData A

join TMP_FHT_SINGLE_ROWS B
on A.FILE_DATE = B.FILE_DATE
and A.FILE_OPTCODE = B.FILE_OPTCODE

left outer Join Setup_Crop_Duration C 
on B.CommoditySymbol = C.CommoditySymbol
and B.MonthSymbol = C.MonthSymbol
and C.PlanningTypeID = 1
;


-- Delete temp tables used to get to this point
drop table if exists TMP_FILE_DT_NOT_IN_FHT;
drop table if exists TMP_FHT_SINGLE_ROWS;



/**********************************************************
Step 4:
In FHT table, remove rows where OI is 0 prior earliest 
row where OI > 0
**********************************************************/
-- Step 1 - get the rows from FHT that have OI >0 -- we can insert
-- all these rows from FHT_TMP into FHT because they're already
-- established with an OI > 0
drop table if exists TMP_FHT_MIN_OI_FILE_DT;
CREATE  TABLE TMP_FHT_MIN_OI_FILE_DT (
	SF_CMYYYY_ID				VARCHAR(15) NOT NULL,
    MIN_FILE_DATE                   DATE NOT NULL ,

	PRIMARY KEY (SF_CMYYYY_ID) 
)
ENGINE = InnoDB;

INSERT INTO TMP_FHT_MIN_OI_FILE_DT

select
SF_CMYYYY_ID
,min(FILE_DATE) as MIN_FILE_DATE
from TA_F_FuturesHistoryTgt
where FILE_OPEN_INT > 0
group by 1
;


-- Step 2 - Determine any new SF_CMYYYY_ID not in the first
-- last that have sum(OI) = 0 for all rows in FHT_TMP -- these
-- are new optcodes that will be deleted from FHT_TMP

drop table if exists TMP_FHT_NEW_ID_ZERO_TOT_OI;
CREATE  TABLE TMP_FHT_NEW_ID_ZERO_TOT_OI (
	SF_CMYYYY_ID				VARCHAR(15) NOT NULL,

	PRIMARY KEY (SF_CMYYYY_ID) 
)
ENGINE = InnoDB;

INSERT INTO TMP_FHT_NEW_ID_ZERO_TOT_OI

select
SF_CMYYYY_ID
from FHT_TMP
where 
SF_CMYYYY_ID not in (
	select SF_CMYYYY_ID 
	from TMP_FHT_MIN_OI_FILE_DT
)
group by 1

having sum(FILE_OPEN_INT) = 0
;

-- Delete the rows from FHT_TMP
delete FHT_TMP
from FHT_TMP

join TMP_FHT_NEW_ID_ZERO_TOT_OI B
on FHT_TMP.SF_CMYYYY_ID = B.SF_CMYYYY_ID
;


-- Step 3 - The remaining rows in FHT either already exist in
-- FHT, but if not, we want to remove any 0 OI rows prior to
-- the first OI row in the data load.  So we need, from FHT_TMP,
-- to get the min(FILE_DATE) with OI > 0.  Then, we need to delete
-- any rows with file dates earlier from FHT_TMP.  This will give
-- us all the good rows for new SF_CMYYYY_ID's to insert into
-- the FHT
drop table if exists TMP_FHT_TMP_MIN_OI_FILE_DT;
CREATE  TABLE TMP_FHT_TMP_MIN_OI_FILE_DT (
	SF_CMYYYY_ID				VARCHAR(15) NOT NULL,
    MIN_FILE_DATE                   DATE NOT NULL ,

	PRIMARY KEY (SF_CMYYYY_ID) 
)
ENGINE = InnoDB;

INSERT INTO TMP_FHT_TMP_MIN_OI_FILE_DT

select
SF_CMYYYY_ID
,min(FILE_DATE) as MIN_FILE_DATE
from FHT_TMP
where 
FILE_OPEN_INT > 0
and SF_CMYYYY_ID not in (
	select SF_CMYYYY_ID 
	from TMP_FHT_MIN_OI_FILE_DT
)

group by 1
;

-- Want to delete rows for existing SF_CMYYYY_ID where date is less than min date
delete FHT_TMP 
from FHT_TMP

join TMP_FHT_TMP_MIN_OI_FILE_DT B
on FHT_TMP.SF_CMYYYY_ID = B.SF_CMYYYY_ID
and FHT_TMP.FILE_DATE < B.MIN_FILE_DATE
;


drop table TMP_FHT_MIN_OI_FILE_DT;
drop table TMP_FHT_NEW_ID_ZERO_TOT_OI;
drop table TMP_FHT_TMP_MIN_OI_FILE_DT;



/**********************************************************
Step 6
Re- Row Number the FHT Table
Add forward and reverse row numbers
**********************************************************/
-- First, get existing max row numbers from FHT
drop table if exists TMP_MAX_RN;
CREATE  TABLE TMP_MAX_RN(
	SF_CMYYYY_ID				VARCHAR(15) NOT NULL,
	MaxRowNbr					SMALLINT,

	PRIMARY KEY (SF_CMYYYY_ID) 
)
ENGINE = InnoDB;

INSERT INTO TMP_MAX_RN

select
SF_CMYYYY_ID
,max(SF_CMYYYY_ID_RowNbr) as MaxRowNbr
from TA_F_FuturesHistoryTgt
group by 1
;


-- First, row number all rows in FHT_TMP
drop table if exists RN_IN_FHT_TMP_1;
CREATE  TABLE RN_IN_FHT_TMP_1(
	SF_CMYYYY_ID				VARCHAR(15) NOT NULL,
	FILE_DATE                   DATE NOT NULL ,
	SF_CMYYYY_ID_RowNbr			SMALLINT NOT NULL,
	PREV_VALUE					VARCHAR(15) NOT NULL,

	PRIMARY KEY (SF_CMYYYY_ID, FILE_DATE) 
)
ENGINE = InnoDB;

INSERT INTO RN_IN_FHT_TMP_1

select
A.SF_CMYYYY_ID
,A.FILE_DATE
,@SF_CMYYYY_ID_RowNbr := IF(@prev_value=A.SF_CMYYYY_ID,@SF_CMYYYY_ID_RowNbr+1,1) AS RowNumber
,@prev_value := A.SF_CMYYYY_ID

from 
FHT_TMP A
,(SELECT @SF_CMYYYY_ID_RowNbr := 1) x
,(SELECT @prev_value := '') y

order by 1,2
;


-- Now create a second table that joins back to the max RN from FHT and 
-- adds it to the FHT_TMP value we just created, and has the effect of
-- adding the max value to rows that exist in FHT table
drop table if exists RN_IN_FHT_TMP_2;
CREATE  TABLE RN_IN_FHT_TMP_2(
	SF_CMYYYY_ID				VARCHAR(15) NOT NULL,
	FILE_DATE                   DATE NOT NULL ,
	SF_CMYYYY_ID_RowNbr			SMALLINT NOT NULL,
	PREV_VALUE					VARCHAR(15) NOT NULL,

	PRIMARY KEY (SF_CMYYYY_ID, FILE_DATE) 
)
ENGINE = InnoDB;

INSERT INTO RN_IN_FHT_TMP_2

select 
A.SF_CMYYYY_ID
,A.FILE_DATE
,A.SF_CMYYYY_ID_RowNbr 
	+ coalesce(B.MaxRowNbr, 0) as SF_CMYYYY_ID_RowNbr
,PREV_VALUE

from RN_IN_FHT_TMP_1 A

left outer join TMP_MAX_RN B
on A.SF_CMYYYY_ID = B.SF_CMYYYY_ID

order by SF_CMYYYY_ID, FILE_DATE
;


-- Update the FHT_TMP table with new row numbers
update FHT_TMP A

join RN_IN_FHT_TMP_2 B1
on A.SF_CMYYYY_ID = B1.SF_CMYYYY_ID
and A.FILE_DATE = B1.FILE_DATE

set 
A.SF_CMYYYY_ID_RowNbr = B1.SF_CMYYYY_ID_RowNbr
;

drop table TMP_MAX_RN;
drop table RN_IN_FHT_TMP_1;
drop table RN_IN_FHT_TMP_2;



/**********************************************************
Step 7
Insert Finalized rows from FHT_TMP to FHT table
**********************************************************/
-- INSERT ROWS into Final FHT Table
insert into TA_F_FuturesHistoryTgt
select * from FHT_TMP;

drop table FHT_TMP;

