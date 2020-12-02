-- For testing purposes to empty out the OHT table to test
-- complete rebuild
--
-- delete from TA_FO_OptionsHistoryTgt where FILE_DATE is not null;
-- delete from TA_FO_OptionsHistoryTgt where FILE_DATE >= '2016-01-01';
-- select count(*) from TA_FO_OptionsHistoryTgt;
-- select * from TA_FO_OptionsHistoryTgt order by FILE_DATE desc limit 1000;

/*****************************************************************

Inserting new rows into OHT table that are were loaded into
the Hist table, but not yet to OHT

Step 1: Get date diff between Hist and OHT
Step 2: Create single row OHT input rows from Hist comb floor/elec
Step 3: Insert single rows into Temp_OHT table

Step 4: In OHT table, remove rows with 0 OI prior to 
existing SFO_CMYYYY_ID with >0 OI date

Step 5: In OHT table, Remove rows with 0 OI for SFO_CMYYYY_ID's 
where sum(OI) = 0 (all rows)

Step 6: Row Number forward/reverse, update OHT table

*****************************************************************/


/*************************************************
Step 1:
Get FILE_DATEs being inserted right now
that are in history table but not in the OHT table
*************************************************/

-- Get file dates from Hist file table
drop table if exists TMP_HIST_FILE_DTS;
CREATE  TABLE TMP_HIST_FILE_DTS (
    FILE_DATE                   DATE NOT NULL ,
	PRIMARY KEY (FILE_DATE) 
)
ENGINE = InnoDB;

INSERT INTO TMP_HIST_FILE_DTS
select FILE_DATE 
from TA_FO_RawFileData A
group by 1
;


-- Get File dates from OHT table
drop table if exists TMP_OHT_FILE_DTS;
CREATE  TABLE TMP_OHT_FILE_DTS (
    FILE_DATE                   DATE NOT NULL ,
	PRIMARY KEY (FILE_DATE) 
)
ENGINE = InnoDB;
INSERT INTO TMP_OHT_FILE_DTS
select FILE_DATE 
from TA_FO_OptionsHistoryTgt
group by 1
;

-- Create file table of Hist dates not in OHT
drop table if exists TMP_FILE_DT_NOT_IN_OHT;
CREATE  TABLE TMP_FILE_DT_NOT_IN_OHT (
    FILE_DATE                   DATE NOT NULL ,
	PRIMARY KEY (FILE_DATE) 
)
ENGINE = InnoDB;

INSERT INTO TMP_FILE_DT_NOT_IN_OHT

select A.FILE_DATE 
from TMP_HIST_FILE_DTS A
left join TMP_OHT_FILE_DTS B
on A.FILE_DATE = B.FILE_DATE
where
B.FILE_DATE is null

group by 1
;

drop table TMP_HIST_FILE_DTS;
drop table TMP_OHT_FILE_DTS;


-- Testing queries
-- select count(distinct FILE_DATE) from TA_FO_RawFileData;
-- select count(*) from TMP_FILE_DT_NOT_IN_OHT;
-- select * from TMP_FILE_DT_NOT_IN_OHT



/*************************************************
Step 2:
Get 'best' row from floor & electronic traded
for the same day by taking max(FILE_OPTCODE), 
which gives you the floor if it exists, then
electronic if it doesn't exist.  Does not use
the Jul 6, 2015 date as an identifier here
*************************************************/


-- First, select all the target rows & pull out generic optcode
drop table if exists TMP_OHT_SINGLE_ROW_1;
CREATE  TABLE TMP_OHT_SINGLE_ROW_1 (
    FILE_DATE                   DATE NOT NULL ,
	FILE_OPTCODE				VARCHAR(20) NOT NULL,
	FILE_OPTCODE_GENERIC		VARCHAR(20)	NOT NULL,

	PRIMARY KEY (FILE_DATE, FILE_OPTCODE),
	INDEX(FILE_DATE, FILE_OPTCODE_GENERIC)
)
ENGINE = InnoDB;


INSERT INTO TMP_OHT_SINGLE_ROW_1

select
A.FILE_DATE
,A.FILE_OPTCODE
,replace(replace(FILE_OPTCODE, '+', ''), '@', '') as FILE_OPTCODE_GENERIC

from TA_FO_RawFileData A

join TMP_FILE_DT_NOT_IN_OHT B
on A.FILE_DATE = B.FILE_DATE
;


-- Next, find the min (elec) and max (floor) code for each date - will be different
-- if there is elec & floor on same date, will be the same if there is only one
-- on a given date
drop table if exists TMP_OHT_SINGLE_ROW_2;
CREATE  TABLE TMP_OHT_SINGLE_ROW_2 (
    FILE_DATE                   DATE NOT NULL ,
	FILE_OPTCODE_GENERIC		VARCHAR(20)	NOT NULL,
	FILE_OPTCODE_MIN			VARCHAR(20) NOT NULL,
	FILE_OPTCODE_MAX			VARCHAR(20) NOT NULL,

	PRIMARY KEY (FILE_DATE, FILE_OPTCODE_GENERIC)
)
ENGINE = InnoDB;

INSERT INTO TMP_OHT_SINGLE_ROW_2

select
A.FILE_DATE
,A.FILE_OPTCODE_GENERIC
,min(FILE_OPTCODE) as FILE_OPTCODE_MIN
,max(FILE_OPTCODE) as FILE_OPTCODE_MAX

from TMP_OHT_SINGLE_ROW_1 A

group by 1,2
;

-- drop the first temp table
drop table TMP_OHT_SINGLE_ROW_1;



-- Using the date, choose floor (max) over electronic (min) on a given date
drop table if exists TMP_OHT_SINGLE_ROW_3;
CREATE  TABLE TMP_OHT_SINGLE_ROW_3 (
    FILE_DATE                   DATE NOT NULL ,
	FILE_OPTCODE				VARCHAR(20)	NOT NULL,

	PRIMARY KEY (FILE_DATE, FILE_OPTCODE)
)
ENGINE = InnoDB;

INSERT INTO TMP_OHT_SINGLE_ROW_3

select
A.FILE_DATE
,case when A.FILE_DATE <= '2015-07-06' then FILE_OPTCODE_MAX 
	else FILE_OPTCODE_MIN
	end as FILE_OPTCODE

from TMP_OHT_SINGLE_ROW_2 A
;

-- drop the first second table
drop table TMP_OHT_SINGLE_ROW_2;



-- Using the chosen optcode, now pull back the FILE_FUTCODE to pull the data
-- on the related futures 
drop table if exists TMP_OHT_SINGLE_ROWS;
CREATE  TABLE TMP_OHT_SINGLE_ROWS (
    FILE_DATE                   DATE NOT NULL ,
	FILE_OPTCODE				VARCHAR(20)	NOT NULL,
	FILE_FUTCODE				VARCHAR(10) NOT NULL ,				

	OptCode_Futures_TA			VARCHAR(10) NOT NULL,
	OptCode_Futures_TA_E		VARCHAR(11) NOT NULL,
	OptCode_Options_TA			VARCHAR(10) NOT NULL,
	OptCode_Options_TA_E		VARCHAR(11) NOT NULL,

	GenericSymbol             	VARCHAR(20) NOT NULL ,
	CommodityMonthID 			INTEGER NOT NULL,
	CommoditySymbol             VARCHAR(5) NOT NULL ,
	MonthSymbol                 VARCHAR(3) NULL ,
	MonthID 					SMALLINT NOT NULL ,
	YearSymbol					SMALLINT NOT NULL,

	PRIMARY KEY (FILE_DATE, FILE_OPTCODE)
)
ENGINE = InnoDB;

INSERT INTO TMP_OHT_SINGLE_ROWS

select
A.FILE_DATE
,A.FILE_OPTCODE
,B.FILE_FUTCODE

,coalesce(C1.OptCode_Futures_TA, C2.OptCode_Futures_TA, '') as OptCode_Futures_TA
,coalesce(C1.OptCode_Futures_TA_E, C2.OptCode_Futures_TA_E, '') as OptCode_Futures_TA_E
,coalesce(C1.OptCode_Options_TA, C2.OptCode_Options_TA, '') as OptCode_Options_TA
,coalesce(C1.OptCode_Options_TA_E, C2.OptCode_Options_TA_E, '') as OptCode_Options_TA_E

,coalesce(C1.GenericSymbol, C2.GenericSymbol, '') as GenericSymbol
,coalesce(C1.CommodityMonthID, C2.CommodityMonthID, 0) as CommodityMonthID
,coalesce(C1.CommoditySymbol, C2.CommoditySymbol, '') as CommoditySymbol
,coalesce(C1.MonthSymbol, C2.MonthSymbol, '') as MonthSymbol
,coalesce(C1.MonthID, C2.MonthID, 0) as MonthID
,coalesce(C1.YearSymbol,C2.YearSymbol, 0) as YearSymbol

from TMP_OHT_SINGLE_ROW_3 A

join TA_FO_RawFileData B
on A.FILE_DATE = B.FILE_DATE
and A.FILE_OPTCODE = B.FILE_OPTCODE

left join Setup_OptCodeMap_Futures C1
on B.FILE_FUTCODE = C1.OptCode_Futures_TA

left join Setup_OptCodeMap_Futures C2
on B.FILE_FUTCODE = C2.OptCode_Futures_TA_E
;


-- drop the first second table
drop table TMP_OHT_SINGLE_ROW_3;


/**********************************************************
Step 3:
Insert new rows into OHT TEMP Table
**********************************************************/

drop table if exists OHT_TMP;
CREATE  TABLE OHT_TMP (
	FILE_OPTCODE VARCHAR(20) NOT NULL ,
	FILE_DATE DATE NOT NULL ,
	FILE_OPEN DECIMAL(24,12) NOT NULL ,
	FILE_HIGH DECIMAL(24,12) NOT NULL ,
	FILE_LOW DECIMAL(24,12) NOT NULL ,
	FILE_CLOSE DECIMAL(24,12) NOT NULL ,
	FILE_VOLUME DECIMAL(24,12) NOT NULL ,
	FILE_OPEN_INT DECIMAL(24,12) NOT NULL ,

	FILE_A DECIMAL(24,12) NOT NULL,
	FILE_B DECIMAL(24,12) NOT NULL,
	FILE_STRIKE DECIMAL(24,12) NOT NULL,
	FILE_OPTMONTH VARCHAR(10) NOT NULL,
	FILE_RIGHT VARCHAR(10) NOT NULL ,
	FILE_EXPIRY_STR VARCHAR(10) NOT NULL,
	FILE_FUTCODE VARCHAR(10) NOT NULL ,
	FILE_FUTPRICE DECIMAL(24,12) NOT NULL,

	CommodityMonthID 			INTEGER NOT NULL,
	CommoditySymbol             VARCHAR(5) NOT NULL ,
	MonthSymbol                 VARCHAR(3) NULL ,
	MonthID 					SMALLINT NOT NULL ,

	Futures_YearNbr				SMALLINT NOT NULL,
	SF_CMYYYY_ID				VARCHAR(15) NOT NULL,
	SFO_CMYYYY_ID				VARCHAR(20) NOT NULL,
	RowAddDate					DATE NOT NULL,

	ModelEvalStartDate			DATE NULL,
	ModelEvalEndDate			DATE NULL,
	ModelEvalRecord				INTEGER NULL,
	ModelEvalCropYear			SMALLINT NULL,

	SFO_CMYYYY_ID_RowNbr			SMALLINT NOT NULL DEFAULT 0,
-- 	SFO_CMYYYY_ID_RowNbrRvrs		SMALLINT NOT NULL,

	PRIMARY KEY (FILE_DATE, FILE_OPTCODE),
	INDEX (FILE_DATE, SFO_CMYYYY_ID),
	INDEX(CommodityMonthID, CommoditySymbol)
)
ENGINE = InnoDB;



INSERT INTO OHT_TMP

select
A.FILE_OPTCODE
,A.FILE_DATE
,A.FILE_OPEN
,A.FILE_HIGH
,A.FILE_LOW
,A.FILE_CLOSE
,A.FILE_VOLUME
,A.FILE_OPEN_INT

,A.FILE_A
,A.FILE_B
,A.FILE_STRIKE
,A.FILE_OPTMONTH
,A.FILE_RIGHT
,A.FILE_EXPIRY_STR
,A.FILE_FUTCODE
,A.FILE_FUTPRICE

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

,case
    when B.MonthID <= 12 then concat(B.CommoditySymbol, B.MonthSymbol, @Futures_YearNbr, '_', lower(left(A.FILE_RIGHT,1)), 
		left( cast(FILE_STRIKE as CHAR), locate('.', cast(FILE_STRIKE as CHAR)) + 3)  )
    else concat(B.CommoditySymbol, B.MonthSymbol, '_', lower(left(A.FILE_RIGHT,1)),left( cast(FILE_STRIKE as CHAR), 
		locate('.', cast(FILE_STRIKE as CHAR)) + 3)  )
    end as SFO_CMYYYY_ID

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


,0 as SFO_CMYYYY_ID_RowNbr			
-- ,0 as SFO_CMYYYY_ID_RowNbrRvrs		


from TA_FO_RawFileData A

join TMP_OHT_SINGLE_ROWS B
on A.FILE_DATE = B.FILE_DATE
and A.FILE_OPTCODE = B.FILE_OPTCODE

left outer Join Setup_Crop_Duration C 
on B.CommoditySymbol = C.CommoditySymbol
and B.MonthSymbol = C.MonthSymbol
and C.PlanningTypeID = 1

where 
B.MonthID <= 12
and FILE_STRIKE >= 1.0
;


-- Delete temp tables used to get to this point
drop table if exists TMP_FILE_DT_NOT_IN_OHT;
drop table if exists TMP_OHT_SINGLE_ROWS;



/**********************************************************
Step 4:
In OHT table, remove rows where OI is 0 prior earliest 
row where OI > 0
**********************************************************/
-- Step 1 - get the rows from OHT that have OI >0 -- we can insert
-- all these rows from OHT_TMP into OHT because they're already
-- established with an OI > 0
drop table if exists TMP_OHT_MIN_OI_FILE_DT;
CREATE  TABLE TMP_OHT_MIN_OI_FILE_DT (
	SFO_CMYYYY_ID					VARCHAR(20) NOT NULL,
    MIN_FILE_DATE                   DATE NOT NULL ,

	PRIMARY KEY (SFO_CMYYYY_ID) 
)
ENGINE = InnoDB;

INSERT INTO TMP_OHT_MIN_OI_FILE_DT

select
SFO_CMYYYY_ID
,min(FILE_DATE) as MIN_FILE_DATE
from TA_FO_OptionsHistoryTgt
where FILE_OPEN_INT > 0
group by 1
;


-- Step 2 - Determine any new SFO_CMYYYY_ID not in the first
-- last that have sum(OI) = 0 for all rows in OHT_TMP -- these
-- are new optcodes that will be deleted from OHT_TMP

drop table if exists TMP_OHT_NEW_ID_ZERO_TOT_OI;
CREATE  TABLE TMP_OHT_NEW_ID_ZERO_TOT_OI (
	SFO_CMYYYY_ID				VARCHAR(20) NOT NULL,

	PRIMARY KEY (SFO_CMYYYY_ID) 
)
ENGINE = InnoDB;

INSERT INTO TMP_OHT_NEW_ID_ZERO_TOT_OI

select
SFO_CMYYYY_ID
from OHT_TMP
where 
SFO_CMYYYY_ID not in (
	select SFO_CMYYYY_ID 
	from TMP_OHT_MIN_OI_FILE_DT
)
group by 1

having sum(FILE_OPEN_INT) = 0
;

-- Delete the rows from OHT_TMP
delete OHT_TMP
from OHT_TMP

join TMP_OHT_NEW_ID_ZERO_TOT_OI B
on OHT_TMP.SFO_CMYYYY_ID = B.SFO_CMYYYY_ID
;


-- Step 3 - The remaining rows in OHT either already exist in
-- OHT, but if not, we want to remove any 0 OI rows prior to
-- the first OI row in the data load.  So we need, from OHT_TMP,
-- to get the min(FILE_DATE) with OI > 0.  Then, we need to delete
-- any rows with file dates earlier from OHT_TMP.  This will give
-- us all the good rows for new SFO_CMYYYY_ID's to insert into
-- the OHT
drop table if exists TMP_OHT_TMP_MIN_OI_FILE_DT;
CREATE  TABLE TMP_OHT_TMP_MIN_OI_FILE_DT (
	SFO_CMYYYY_ID				VARCHAR(20) NOT NULL,
    MIN_FILE_DATE                   DATE NOT NULL ,

	PRIMARY KEY (SFO_CMYYYY_ID) 
)
ENGINE = InnoDB;

INSERT INTO TMP_OHT_TMP_MIN_OI_FILE_DT

select 
SFO_CMYYYY_ID
,min(FILE_DATE) as MIN_FILE_DATE

from OHT_TMP
where 
FILE_OPEN_INT > 0
and SFO_CMYYYY_ID not in (
	select SFO_CMYYYY_ID 
	from TMP_OHT_MIN_OI_FILE_DT
)

group by 1
;


-- Want to delete rows for existing SFO_CMYYYY_ID where date is less than min date
delete OHT_TMP 
from OHT_TMP

join TMP_OHT_TMP_MIN_OI_FILE_DT B
on OHT_TMP.SFO_CMYYYY_ID = B.SFO_CMYYYY_ID
and OHT_TMP.FILE_DATE < B.MIN_FILE_DATE
;


drop table TMP_OHT_MIN_OI_FILE_DT;
drop table TMP_OHT_NEW_ID_ZERO_TOT_OI;
drop table TMP_OHT_TMP_MIN_OI_FILE_DT;



/**********************************************************
Step 6
Re- Row Number the OHT Table
Add forward and reverse row numbers
**********************************************************/
-- First, get existing max row numbers from OHT
drop table if exists TMP_MAX_RN;
CREATE  TABLE TMP_MAX_RN(
	SFO_CMYYYY_ID				VARCHAR(20) NOT NULL,
	MaxRowNbr					SMALLINT,

	PRIMARY KEY (SFO_CMYYYY_ID) 
)
ENGINE = InnoDB;

INSERT INTO TMP_MAX_RN

select
SFO_CMYYYY_ID
,max(SFO_CMYYYY_ID_RowNbr) as MaxRowNbr
from TA_FO_OptionsHistoryTgt
group by 1
;


-- First, row number all rows in OHT_TMP
drop table if exists RN_IN_OHT_TMP_1;
CREATE  TABLE RN_IN_OHT_TMP_1(
	SFO_CMYYYY_ID				VARCHAR(20) NOT NULL,
	FILE_DATE                   DATE NOT NULL ,
	SFO_CMYYYY_ID_RowNbr			SMALLINT NOT NULL,
	PREV_VALUE					VARCHAR(20) NOT NULL,

	PRIMARY KEY (SFO_CMYYYY_ID, FILE_DATE) 
)
ENGINE = InnoDB;

INSERT INTO RN_IN_OHT_TMP_1

select
A.SFO_CMYYYY_ID
,A.FILE_DATE
,@SFO_CMYYYY_ID_RowNbr := IF(@prev_value=A.SFO_CMYYYY_ID,@SFO_CMYYYY_ID_RowNbr+1,1) AS RowNumber
,@prev_value := A.SFO_CMYYYY_ID

from 
OHT_TMP A
,(SELECT @SFO_CMYYYY_ID_RowNbr := 1) x
,(SELECT @prev_value := '') y

order by 1,2
;


-- Now create a second table that joins back to the max RN from OHT and 
-- adds it to the OHT_TMP value we just created, and has the effect of
-- adding the max value to rows that exist in OHT table
drop table if exists RN_IN_OHT_TMP_2;
CREATE  TABLE RN_IN_OHT_TMP_2(
	SFO_CMYYYY_ID				VARCHAR(20) NOT NULL,
	FILE_DATE                   DATE NOT NULL ,
	SFO_CMYYYY_ID_RowNbr			SMALLINT NOT NULL,
	PREV_VALUE					VARCHAR(20) NOT NULL,

	PRIMARY KEY (SFO_CMYYYY_ID, FILE_DATE) 
)
ENGINE = InnoDB;

INSERT INTO RN_IN_OHT_TMP_2

select 
A.SFO_CMYYYY_ID
,A.FILE_DATE
,A.SFO_CMYYYY_ID_RowNbr 
	+ coalesce(B.MaxRowNbr, 0) as SFO_CMYYYY_ID_RowNbr
,PREV_VALUE

from RN_IN_OHT_TMP_1 A

left outer join TMP_MAX_RN B
on A.SFO_CMYYYY_ID = B.SFO_CMYYYY_ID

order by SFO_CMYYYY_ID, FILE_DATE
;


-- Update the OHT_TMP table with new row numbers
update OHT_TMP A

join RN_IN_OHT_TMP_2 B1
on A.SFO_CMYYYY_ID = B1.SFO_CMYYYY_ID
and A.FILE_DATE = B1.FILE_DATE

set 
A.SFO_CMYYYY_ID_RowNbr = B1.SFO_CMYYYY_ID_RowNbr
;

drop table TMP_MAX_RN;
drop table RN_IN_OHT_TMP_1;
drop table RN_IN_OHT_TMP_2;




-- This step being added to solve for the issue where the FO file
-- field for FILEFUTPRICE is zero on some rows, but correctly populated
-- with the related future closing price on others.  We'll take the 
-- max(FILE_FUTPRICE) for every FILE_DATE, SF_CMYYYY_ID
drop table if exists DATE_OC_FUTPRICE;
CREATE  TABLE DATE_OC_FUTPRICE(
	FILE_DATE                   DATE NOT NULL ,
	SF_CMYYYY_ID				VARCHAR(15) NOT NULL,
	FILE_FUTPRICE_MAX			DECIMAL(24,12) NOT NULL,

	PRIMARY KEY (FILE_DATE, SF_CMYYYY_ID) 
)
ENGINE = InnoDB;

INSERT INTO DATE_OC_FUTPRICE

select 
FILE_DATE
,SF_CMYYYY_ID
,max(FILE_FUTPRICE) as FILE_FUTPRICE_MAX
from OHT_TMP
group by 1,2
;


/**********************************************************
Step 7
Insert Finalized rows from OHT_TMP to OHT table
**********************************************************/
-- INSERT ROWS into Final OHT Table
insert into TA_FO_OptionsHistoryTgt
select 
A.FILE_OPTCODE
,A.FILE_DATE
,A.FILE_OPEN
,A.FILE_HIGH
,A.FILE_LOW
,A.FILE_CLOSE
,A.FILE_VOLUME
,A.FILE_OPEN_INT
,A.FILE_A
,A.FILE_B
,A.FILE_STRIKE
,A.FILE_OPTMONTH
,A.FILE_RIGHT
,A.FILE_EXPIRY_STR
,A.FILE_FUTCODE
,coalesce(B.FILE_CLOSE, C.FILE_FUTPRICE_MAX, A.FILE_FUTPRICE) as FILE_FUTPRICE
,A.CommodityMonthID
,A.CommoditySymbol
,A.MonthSymbol
,A.MonthID
,A.Futures_YearNbr
,A.SF_CMYYYY_ID
,A.SFO_CMYYYY_ID
,A.RowAddDate
,A.ModelEvalStartDate
,A.ModelEvalEndDate
,A.ModelEvalRecord
,A.ModelEvalCropYear
,A.SFO_CMYYYY_ID_RowNbr 

from OHT_TMP A

left outer join TA_F_FuturesHistoryTgt B
on A.FILE_DATE = B.FILE_DATE
and A.SF_CMYYYY_ID = B.SF_CMYYYY_ID

left outer join DATE_OC_FUTPRICE C
on A.FILE_DATE = C.FILE_DATE
and A.SF_CMYYYY_ID = C.SF_CMYYYY_ID
;


drop table OHT_TMP;
drop table DATE_OC_FUTPRICE;
