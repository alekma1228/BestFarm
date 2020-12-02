-- MySQL dump 10.13  Distrib 5.6.22, for osx10.8 (x86_64)
--
-- Host: croptomize-production-instance-1.cegfvtycydtu.us-east-2.rds.amazonaws.com    Database: inputdata
-- ------------------------------------------------------
-- Server version	5.7.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED='';

--
-- Table structure for table `basis_usda_clean`
--

DROP TABLE IF EXISTS `basis_usda_clean`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `basis_usda_clean` (
  `Crop_Type` varchar(1) NOT NULL,
  `FUT_SYMBOL` varchar(8) NOT NULL,
  `STATE_CD` varchar(3) NOT NULL,
  `LOCATION` varchar(50) NOT NULL,
  `NC_STATE_CD` varchar(3) NOT NULL,
  `NC_LOCATION` varchar(50) NOT NULL,
  `FRI_WK_END_DT` date NOT NULL,
  `LOC_BID_CASH_DLR` decimal(18,4) DEFAULT NULL,
  `LOC_BID_CASH_CENTS` decimal(18,4) DEFAULT NULL,
  `LOC_BID_CASH_300K_DLR` decimal(18,4) DEFAULT NULL,
  `NCSRC_BID_CASH_DLR` decimal(18,4) DEFAULT NULL,
  `NCSRC_BID_CASH_CENTS` decimal(18,4) DEFAULT NULL,
  `NCSRC_BID_CASH_300K_DLR` decimal(18,4) DEFAULT NULL,
  `DELTA_BID_CASH_DLR` decimal(18,4) DEFAULT NULL,
  `DELTA_BID_CASH_CENTS` decimal(18,4) DEFAULT NULL,
  `DELTA_BID_CASH_300K_DLR` decimal(18,4) DEFAULT NULL,
  `NCSRC_BID_NC_DLR` decimal(18,4) DEFAULT NULL,
  `NCSRC_BID_NC_CENTS` decimal(18,4) DEFAULT NULL,
  `NCSRC_BID_NC_300K_DLR` decimal(18,4) DEFAULT NULL,
  `LOC_BID_NC_DLR` decimal(18,4) DEFAULT NULL,
  `LOC_BID_NC_CENTS` decimal(18,4) DEFAULT NULL,
  `LOC_BID_NC_300K_DLR` decimal(18,4) DEFAULT NULL,
  PRIMARY KEY (`Crop_Type`,`FUT_SYMBOL`,`STATE_CD`,`LOCATION`,`FRI_WK_END_DT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cme_rawfiledata`
--

DROP TABLE IF EXISTS `cme_rawfiledata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cme_rawfiledata` (
  `BizDt` date NOT NULL,
  `Sym` varchar(10) NOT NULL,
  `ID` varchar(10) NOT NULL,
  `StrkPx` decimal(24,12) DEFAULT NULL,
  `SecTyp` varchar(10) NOT NULL,
  `MMY` int(11) DEFAULT NULL,
  `MatDt` date NOT NULL,
  `PutCall` int(11) DEFAULT NULL,
  `Exch` varchar(10) NOT NULL,
  `Descr` varchar(10) NOT NULL,
  `LastTrdDt` date NOT NULL,
  `BidPrice` decimal(24,12) DEFAULT NULL,
  `OpeningPrice` decimal(24,12) DEFAULT NULL,
  `SettlePrice` decimal(24,12) DEFAULT NULL,
  `SettleDelta` decimal(24,12) DEFAULT NULL,
  `HighLimit` decimal(24,12) DEFAULT NULL,
  `LowLimit` decimal(24,12) DEFAULT NULL,
  `DHighPrice` decimal(24,12) DEFAULT NULL,
  `DLowPrice` decimal(24,12) DEFAULT NULL,
  `HighBid` decimal(24,12) DEFAULT NULL,
  `LowBid` decimal(24,12) DEFAULT NULL,
  `PrevDayVol` int(11) DEFAULT NULL,
  `PrevDayOI` int(11) DEFAULT NULL,
  `FixingPrice` decimal(24,12) DEFAULT NULL,
  `UndlyExch` varchar(10) DEFAULT NULL,
  `UndlyID` varchar(10) DEFAULT NULL,
  `UndlySecTyp` varchar(10) DEFAULT NULL,
  `UndlyMMY` varchar(10) DEFAULT NULL,
  `BankBusDay` varchar(10) DEFAULT NULL,
   KEY `idx_cme_rawfiledata_BizDt` (`BizDt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cme_rawfiletmp`
--

DROP TABLE IF EXISTS `cme_rawfiletmp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cme_rawfiletmp` (
  `BizDt` date NOT NULL,
  `Sym` varchar(10) NOT NULL,
  `ID` varchar(10) NOT NULL,
  `StrkPx` decimal(24,12) DEFAULT NULL,
  `SecTyp` varchar(10) NOT NULL,
  `MMY` int(11) DEFAULT NULL,
  `MatDt` date NOT NULL,
  `PutCall` int(11) DEFAULT NULL,
  `Exch` varchar(10) NOT NULL,
  `Descr` varchar(10) NOT NULL,
  `LastTrdDt` date NOT NULL,
  `BidPrice` decimal(24,12) DEFAULT NULL,
  `OpeningPrice` decimal(24,12) DEFAULT NULL,
  `SettlePrice` decimal(24,12) DEFAULT NULL,
  `SettleDelta` decimal(24,12) DEFAULT NULL,
  `HighLimit` decimal(24,12) DEFAULT NULL,
  `LowLimit` decimal(24,12) DEFAULT NULL,
  `DHighPrice` decimal(24,12) DEFAULT NULL,
  `DLowPrice` decimal(24,12) DEFAULT NULL,
  `HighBid` decimal(24,12) DEFAULT NULL,
  `LowBid` decimal(24,12) DEFAULT NULL,
  `PrevDayVol` int(11) DEFAULT NULL,
  `PrevDayOI` int(11) DEFAULT NULL,
  `FixingPrice` decimal(24,12) DEFAULT NULL,
  `UndlyExch` varchar(10) DEFAULT NULL,
  `UndlyID` varchar(10) DEFAULT NULL,
  `UndlySecTyp` varchar(10) DEFAULT NULL,
  `UndlyMMY` varchar(10) DEFAULT NULL,
  `BankBusDay` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `setup_clndr_agrbl_fri_2010_2025`
--

DROP TABLE IF EXISTS `setup_clndr_agrbl_fri_2010_2025`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setup_clndr_agrbl_fri_2010_2025` (
  `CROP_TYPE` varchar(3) NOT NULL,
  `CROP_YEAR` int(11) NOT NULL,
  `YEAR_START_WEEK` int(11) NOT NULL,
  `YR_STRT_WK_OF_CAL` int(11) NOT NULL,
  `CAL_DATE` date NOT NULL,
  `YYYYMMDD` int(11) NOT NULL,
  `YEAR_NBR` int(11) NOT NULL,
  `YR_MO_NBR` int(11) NOT NULL,
  `QUARTER` int(11) NOT NULL,
  `MONTH_NBR` int(11) NOT NULL,
  `MONTH_NME` varchar(5) NOT NULL,
  `YYYYWW` int(11) NOT NULL,
  `WEEK_OF_YEAR` int(11) NOT NULL,
  `WEEK_OF_CALENDAR` int(11) NOT NULL,
  `DAY_OF_YEAR` int(11) NOT NULL,
  `DAY_OF_MONTH` int(11) NOT NULL,
  `DAY_OF_WEEK` int(11) NOT NULL,
  `DAY_NAME` varchar(10) NOT NULL,
  `FLAG_IS_WEEKDAY` int(11) NOT NULL,
  `WEEK_OF_CROP_YEAR` int(11) NOT NULL,
  `DAY_OF_CROP_YEAR` int(11) NOT NULL,
  `WEEK_OF_CROP_YR_MO` int(11) NOT NULL,
  `DAY_OF_CROP_YR_MO_NBR` int(11) NOT NULL,
  `CROP_PHASE` varchar(15) NOT NULL,
  PRIMARY KEY (`CROP_TYPE`,`CROP_YEAR`,`CAL_DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `setup_clndr_dly_1965_2040`
--

DROP TABLE IF EXISTS `setup_clndr_dly_1965_2040`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setup_clndr_dly_1965_2040` (
  `CAL_DATE` date NOT NULL,
  `YYYYMMDD` int(11) DEFAULT NULL,
  `YEAR_NBR` int(11) DEFAULT NULL,
  `YR_MO_NBR` int(11) DEFAULT NULL,
  `QUARTER` int(11) DEFAULT NULL,
  `MONTH_NBR` int(11) DEFAULT NULL,
  `MONTH_NME` varchar(5) DEFAULT NULL,
  `YYYYWW` int(11) NOT NULL,
  `WEEK_OF_YEAR` int(11) DEFAULT NULL,
  `WEEK_OF_CALENDAR` int(11) DEFAULT NULL,
  `DAY_OF_YEAR` int(11) DEFAULT NULL,
  `DAY_OF_MONTH` int(11) DEFAULT NULL,
  `DAY_OF_WEEK` int(11) DEFAULT NULL,
  `DAY_NAME` varchar(10) DEFAULT NULL,
  `FLAG_IS_WEEKDAY` int(11) DEFAULT NULL,
  PRIMARY KEY (`CAL_DATE`,`YYYYWW`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `setup_commoditymonth`
--

DROP TABLE IF EXISTS `setup_commoditymonth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setup_commoditymonth` (
  `CommodityMonthID` int(11) NOT NULL,
  `CommoditySymbol` varchar(5) NOT NULL,
  `MonthSymbol` varchar(3) NOT NULL,
  `NewCrop` varchar(5) NOT NULL,
  PRIMARY KEY (`CommodityMonthID`,`CommoditySymbol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `setup_commoditytype`
--

DROP TABLE IF EXISTS `setup_commoditytype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setup_commoditytype` (
  `CommoditySymbol` varchar(5) NOT NULL,
  `Commodity` varchar(50) NOT NULL,
  `CommoditySymbol_TA_F_FILE` varchar(5) NOT NULL,
  `CommoditySymbol_TA_F_FILE_E` varchar(6) NOT NULL,
  `CommoditySymbol_TA_FO_FILE` varchar(5) NOT NULL,
  `CommoditySymbol_TA_FO_FILE_E` varchar(6) NOT NULL,
  `CommoditySymbol_CME_EXCH` varchar(5) NOT NULL,
  `CommoditySymbol_CME_GRP_SYM` varchar(6) NOT NULL,
  `CommoditySymbol_CME_F_SYM` varchar(6) NOT NULL,
  `CommoditySymbol_CME_FO_SYM` varchar(6) NOT NULL,
  `CommodityGroupID` int(11) DEFAULT NULL,
  `CommodityGroup` varchar(50) NOT NULL,
  `CommodityDailyMaxExists` smallint(6) NOT NULL,
  `CommodityMaxDlyLimit` decimal(24,12) NOT NULL,
  PRIMARY KEY (`CommoditySymbol`,`CommoditySymbol_TA_F_FILE`),
  KEY `idx_setup_commoditytype_CommoditySymbol_CME_GRP_SYM` (`CommoditySymbol_CME_GRP_SYM`),
  KEY `idx_setup_commoditytype_CommoditySymbol_CME_FO_SYM` (`CommoditySymbol_CME_FO_SYM`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `setup_crop_duration`
--

DROP TABLE IF EXISTS `setup_crop_duration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setup_crop_duration` (
  `PlanningTypeID` int(11) NOT NULL,
  `PlanningTypeDesc` varchar(10) NOT NULL,
  `CommoditySymbol` varchar(5) NOT NULL,
  `MonthSymbol` varchar(5) NOT NULL,
  `MonthDesc` varchar(10) NOT NULL,
  `EvaluationStartDate` varchar(10) NOT NULL,
  `EvaluationEndDate` varchar(10) NOT NULL,
  `ContractBaseStartDate` varchar(10) NOT NULL,
  `ContractBaseEndDate` varchar(10) NOT NULL,
  `StartMonth` int(11) NOT NULL,
  `EndMonth` int(11) NOT NULL,
  `StartYearAdj` int(11) NOT NULL,
  `EndYearAdj` int(11) NOT NULL,
  `StartDay` int(11) NOT NULL,
  `EndDay` int(11) NOT NULL,
  `CropYearAdj` int(11) NOT NULL,
  PRIMARY KEY (`PlanningTypeID`,`CommoditySymbol`,`MonthSymbol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `setup_monthtype`
--

DROP TABLE IF EXISTS `setup_monthtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setup_monthtype` (
  `MonthID` smallint(6) NOT NULL,
  `MonthSymbol` varchar(3) NOT NULL,
  `MonthName` varchar(15) NOT NULL,
  PRIMARY KEY (`MonthSymbol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `setup_optcodemap_futures`
--

DROP TABLE IF EXISTS `setup_optcodemap_futures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setup_optcodemap_futures` (
  `OptCode_Futures_TA` varchar(10) NOT NULL,
  `OptCode_Futures_TA_Length` smallint(6) NOT NULL,
  `OptCode_Futures_TA_E` varchar(11) NOT NULL,
  `OptCode_Futures_TA_E_Length` smallint(6) NOT NULL,
  `OptCode_Options_TA` varchar(10) NOT NULL,
  `OptCode_Options_TA_Length` smallint(6) NOT NULL,
  `OptCode_Options_TA_E` varchar(11) NOT NULL,
  `OptCode_Options_TA_E_Length` smallint(6) NOT NULL,
  `CommoditySymbol` varchar(5) NOT NULL,
  `CommoditySymbol_TA_F_FILE` varchar(5) NOT NULL,
  `CommoditySymbol_TA_F_FILE_E` varchar(5) NOT NULL,
  `YearSymbol` smallint(6) NOT NULL,
  `MonthSymbol` varchar(3) NOT NULL,
  `MonthID` smallint(6) NOT NULL,
  `CommodityMonthID` int(11) NOT NULL,
  `GenericSymbol` varchar(20) NOT NULL,
  PRIMARY KEY (`OptCode_Futures_TA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `setup_optioncontracttype`
--

DROP TABLE IF EXISTS `setup_optioncontracttype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setup_optioncontracttype` (
  `ContractType` varchar(10) NOT NULL,
  `ContractGroupid` varchar(10) NOT NULL,
  `ContractGroup` varchar(10) NOT NULL,
  `ContractTypeSymbol` varchar(5) NOT NULL,
  PRIMARY KEY (`ContractType`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `setup_spreadtype`
--

DROP TABLE IF EXISTS `setup_spreadtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setup_spreadtype` (
  `SpreadTypeDescription` varchar(100) NOT NULL,
  `SpreadTypeDesShort` varchar(50) NOT NULL,
  `SpreadLevel` smallint(6) NOT NULL,
  `SpreadLevelDescription` varchar(100) NOT NULL,
  PRIMARY KEY (`SpreadTypeDescription`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `setup_yearnbr`
--

DROP TABLE IF EXISTS `setup_yearnbr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setup_yearnbr` (
  `YearNbr` smallint(6) NOT NULL,
  `YearNbr_ID` smallint(6) NOT NULL,
  PRIMARY KEY (`YearNbr`,`YearNbr_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `setup_yeartype`
--

DROP TABLE IF EXISTS `setup_yeartype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setup_yeartype` (
  `YearSymbol` smallint(6) NOT NULL,
  PRIMARY KEY (`YearSymbol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ta_f_futureshistorytgt`
--

DROP TABLE IF EXISTS `ta_f_futureshistorytgt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ta_f_futureshistorytgt` (
  `FILE_OPTCODE` varchar(20) NOT NULL,
  `FILE_DATE` date NOT NULL,
  `FILE_OPEN` decimal(24,12) NOT NULL,
  `FILE_HIGH` decimal(24,12) NOT NULL,
  `FILE_LOW` decimal(24,12) NOT NULL,
  `FILE_CLOSE` decimal(24,12) NOT NULL,
  `FILE_VOLUME` decimal(24,12) NOT NULL,
  `FILE_OPEN_INT` decimal(24,12) NOT NULL,
  `CommodityMonthID` int(11) NOT NULL,
  `CommoditySymbol` varchar(5) NOT NULL,
  `MonthSymbol` varchar(3) DEFAULT NULL,
  `MonthID` smallint(6) NOT NULL,
  `Futures_YearNbr` smallint(6) NOT NULL,
  `SF_CMYYYY_ID` varchar(15) NOT NULL,
  `RowAddDate` date NOT NULL,
  `ModelEvalStartDate` date DEFAULT NULL,
  `ModelEvalEndDate` date DEFAULT NULL,
  `ModelEvalRecord` int(11) DEFAULT NULL,
  `ModelEvalCropYear` smallint(6) DEFAULT NULL,
  `SF_CMYYYY_ID_RowNbr` smallint(6) NOT NULL,
  PRIMARY KEY (`FILE_OPTCODE`,`FILE_DATE`),
  KEY `idx_ta_f_futureshistorytgt_FILE_DATE` (`FILE_DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ta_f_rawfiledata`
--

DROP TABLE IF EXISTS `ta_f_rawfiledata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ta_f_rawfiledata` (
  `FILE_OPTCODE` varchar(20) NOT NULL,
  `FILE_DATE` date NOT NULL,
  `FILE_OPEN` decimal(24,12) NOT NULL,
  `FILE_HIGH` decimal(24,12) NOT NULL,
  `FILE_LOW` decimal(24,12) NOT NULL,
  `FILE_CLOSE` decimal(24,12) NOT NULL,
  `FILE_VOLUME` decimal(24,12) NOT NULL,
  `FILE_OPEN_INT` decimal(24,12) NOT NULL,
  PRIMARY KEY (`FILE_OPTCODE`,`FILE_DATE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ta_fo_optionshistorytgt`
--

DROP TABLE IF EXISTS `ta_fo_optionshistorytgt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ta_fo_optionshistorytgt` (
  `FILE_OPTCODE` varchar(20) NOT NULL,
  `FILE_DATE` date NOT NULL,
  `FILE_OPEN` decimal(24,12) NOT NULL,
  `FILE_HIGH` decimal(24,12) NOT NULL,
  `FILE_LOW` decimal(24,12) NOT NULL,
  `FILE_CLOSE` decimal(24,12) NOT NULL,
  `FILE_VOLUME` decimal(24,12) NOT NULL,
  `FILE_OPEN_INT` decimal(24,12) NOT NULL,
  `FILE_A` decimal(24,12) NOT NULL,
  `FILE_B` decimal(24,12) NOT NULL,
  `FILE_STRIKE` decimal(24,12) NOT NULL,
  `FILE_OPTMONTH` varchar(10) NOT NULL,
  `FILE_RIGHT` varchar(10) NOT NULL,
  `FILE_EXPIRY_STR` varchar(10) NOT NULL,
  `FILE_FUTCODE` varchar(10) NOT NULL,
  `FILE_FUTPRICE` decimal(24,12) NOT NULL,
  `CommodityMonthID` int(11) NOT NULL,
  `CommoditySymbol` varchar(5) NOT NULL,
  `MonthSymbol` varchar(3) DEFAULT NULL,
  `MonthID` smallint(6) NOT NULL,
  `Futures_YearNbr` smallint(6) NOT NULL,
  `SF_CMYYYY_ID` varchar(15) NOT NULL,
  `SFO_CMYYYY_ID` varchar(20) NOT NULL,
  `RowAddDate` date NOT NULL,
  `ModelEvalStartDate` date DEFAULT NULL,
  `ModelEvalEndDate` date DEFAULT NULL,
  `ModelEvalRecord` int(11) DEFAULT NULL,
  `ModelEvalCropYear` smallint(6) DEFAULT NULL,
  `SFO_CMYYYY_ID_RowNbr` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ta_fo_rawfiledata`
--

DROP TABLE IF EXISTS `ta_fo_rawfiledata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ta_fo_rawfiledata` (
  `FILE_OPTCODE` varchar(20) NOT NULL,
  `FILE_DATE` date NOT NULL,
  `FILE_OPEN` decimal(24,12) NOT NULL,
  `FILE_HIGH` decimal(24,12) NOT NULL,
  `FILE_LOW` decimal(24,12) NOT NULL,
  `FILE_CLOSE` decimal(24,12) NOT NULL,
  `FILE_VOLUME` decimal(24,12) NOT NULL,
  `FILE_OPEN_INT` decimal(24,12) NOT NULL,
  `FILE_A` decimal(24,12) NOT NULL,
  `FILE_B` decimal(24,12) NOT NULL,
  `FILE_STRIKE` decimal(24,12) NOT NULL,
  `FILE_OPTMONTH` varchar(10) NOT NULL,
  `FILE_RIGHT` varchar(10) NOT NULL,
  `FILE_EXPIRY_STR` varchar(10) NOT NULL,
  `FILE_FUTCODE` varchar(10) NOT NULL,
  `FILE_FUTPRICE` decimal(24,12) NOT NULL,
  PRIMARY KEY (`FILE_DATE`,`FILE_OPTCODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'inputdata'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-17 17:09:31
