/*
SQLyog ‰ºÅ‰∏öÁâà - MySQL GUI v8.14 
MySQL - 5.0.67-community-log : Database - ingrid
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ingrid` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `ingrid`;

/*Table structure for table `act_evt_log` */

DROP TABLE IF EXISTS `act_evt_log`;

CREATE TABLE `act_evt_log` (
  `LOG_NR_` bigint(20) NOT NULL auto_increment,
  `TYPE_` varchar(64) collate utf8_bin default NULL,
  `PROC_DEF_ID_` varchar(64) collate utf8_bin default NULL,
  `PROC_INST_ID_` varchar(64) collate utf8_bin default NULL,
  `EXECUTION_ID_` varchar(64) collate utf8_bin default NULL,
  `TASK_ID_` varchar(64) collate utf8_bin default NULL,
  `TIME_STAMP_` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  `USER_ID_` varchar(255) collate utf8_bin default NULL,
  `DATA_` longblob,
  `LOCK_OWNER_` varchar(255) collate utf8_bin default NULL,
  `LOCK_TIME_` timestamp NULL default NULL,
  `IS_PROCESSED_` tinyint(4) default '0',
  PRIMARY KEY  (`LOG_NR_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_evt_log` */

/*Table structure for table `act_ge_bytearray` */

DROP TABLE IF EXISTS `act_ge_bytearray`;

CREATE TABLE `act_ge_bytearray` (
  `ID_` varchar(64) collate utf8_bin NOT NULL default '',
  `REV_` int(11) default NULL,
  `NAME_` varchar(255) collate utf8_bin default NULL,
  `DEPLOYMENT_ID_` varchar(64) collate utf8_bin default NULL,
  `BYTES_` longblob,
  `GENERATED_` tinyint(4) default NULL,
  PRIMARY KEY  (`ID_`),
  KEY `ACT_FK_BYTEARR_DEPL` (`DEPLOYMENT_ID_`),
  CONSTRAINT `ACT_FK_BYTEARR_DEPL` FOREIGN KEY (`DEPLOYMENT_ID_`) REFERENCES `act_re_deployment` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_ge_bytearray` */

insert  into `act_ge_bytearray`(`ID_`,`REV_`,`NAME_`,`DEPLOYMENT_ID_`,`BYTES_`,`GENERATED_`) values ('10002',1,'source',NULL,'{\"id\":\"canvas\",\"resourceId\":\"canvas\",\"stencilset\":{\"namespace\":\"http://b3mn.org/stencilset/bpmn2.0#\"}}',NULL),('10003',1,'source-extra',NULL,'âPNG\r\n\Z\n\0\0\0\rIHDR\0\0\0£\0\0\0û\0\0\0^à∫Û\0\0\0 cHRM\0\0z&\0\0ÄÑ\0\0˙\0\0\0ÄË\0\0u0\0\0Í`\0\0:ò\0\0pú∫Q<\0\0\0gAMA\0\0±é|˚Qì\0\0\0sRGB\0ÆŒÈ\0\0\0bKGD\0ˇ\0ˇ\0ˇ†Ωßì\0\0\0	pHYs\0\0ƒ\0\0ƒï+\0\0œIDATx⁄Ì‹]H§U«ÒGg›5G”¡ƒîÛ˝çdê’ 2î∫í‘Ç`£ãº≥ Ò\"°Ò*vIíPBG4µ@ï|AE»Òmd*tŸuE«µUg|¡Å’ôŒŸÍbvó“öyà·˚9\né?˛ÁúÁúGE\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0®\'Ñ!Pó◊Îç∞ŸlÔ/..æÎp8Ú∂∑∑Øj›n∑¢’jΩQQQccc∑Ùz˝¨¯ıœ\Z\Z~%å{˚˚˚€Ïv{Õﬁﬁû6==]…ÕÕU>%\"\"BëÅ<::R677ï’’Ueaa¡\Z\ZzÔ‰‰§π≠≠Ìk¬àˇlnnÓÉ±±±õ.ó+º∫∫˙Q5\ZÕÖ>ªºº¨X,ñÛÉÉÉµ˝˝˝∑z{{◊Éuú4D%†’P[PP0÷◊◊˜qIIâ∂ÆÆNIHHPDµªﬂàèèWJKKC√¬¬û[__øQXXxﬂjµ.F\\*àììì≥CCC◊ÍÎÎï¢¢¢KÖqÉA…ÀÀõôôy]¥N1ÖˇDq!≤\"  666>Z˙CLLåb2ô¬∆««_IMM›Î ¬à\\# ©YVDÒ/ëëëJNNénjjÍ’åååÔE À∏ÖˇÔöGFFnUTT(F£1 }$%%)UUU·b⁄ˇ&ò∆é0˙Ÿ‡‡`˚——ëÆ¨¨,†˝îóó_âééNÆ©©yè0‚©UQLõÔ»«7b˜˛ÃfÛ≥¢:~DÒy≤≤ªª´ïœ’ ◊é···…\"¸/F¯êG|óy†ÌŸŸŸ;¢©$å!œö≥≤≤TÌ”d2≈àÊ:aÑyÈAÓt’îíírU4y¡0~Z\"‰?Úˆç|0≠&±£~^4n*#|»[7Úˆçö˛Ï/Ç0¬áÿŸze ’tzzzü à\'Ëı˙áNßS’>E.—< å!÷ã˜666TÌ”f≥›Õaƒ„ïqRﬁ–V”ÏÏ¨W4ìÑ>\\.◊KKKûÛÛs’ˆLkkki¢Ì#å—‹‹|[ß”›ëØ\n®add‰;è«≥m±XÓF<≠:~⁄’’u¶ButvttdÑÑÑ|,cG˝¨ΩΩΩ˜¯¯¯Á···Äˆ”““\"´‚â√·∞F¸]u|{``‡T¨ÁµÉ˛¡jµVà™xcbb‚,X∆ç◊@Ï®ùôôôwÁÁÁﬂîÔ¨»W¸ekkk¶©©È%ÒÌ\'›››?”∏∆\0YYY±•••ÌLOOø&Z]\\\\ú_*¢¢Xèﬁõñõ¡6fÑ1ÄDx\r√»74\ZÕô—h‘˝À◊Uù≠≠≠ñûûûÎ^Ø˜3—~å„≈îPÅºâ-Bÿïi6õı˘˘˘W.¯Q˜ËËË`ggß·ÏÏÃ-◊àbj˛%X«â0™ J u:]∂ò∫+..~&99Y/oﬂ»KÚ¨Ÿn∑Øâj™ 9%o…M˙ŒŒŒ∑¡¥Y!åˇµµµ/x<ûJ1Â^?æ,æ‚ï?ÆÅ…€7Ú“É<kñG|}¡Ú@\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0.Ïw«∏µD~Ïi\0\0\0\0IENDÆB`Ç',NULL),('2',5,'source',NULL,'{\"resourceId\":\"1\",\"properties\":{\"process_id\":\"process\",\"name\":\"\",\"documentation\":\"\",\"process_author\":\"\",\"process_version\":\"\",\"process_namespace\":\"http://www.activiti.org/processdef\",\"executionlisteners\":\"\",\"eventlisteners\":\"\",\"signaldefinitions\":\"\",\"messagedefinitions\":\"\"},\"stencil\":{\"id\":\"BPMNDiagram\"},\"childShapes\":[{\"resourceId\":\"sid-7D396522-191A-4E1D-A14E-E14169DDF8A2\",\"properties\":{\"overrideid\":\"\",\"name\":\"\",\"documentation\":\"\",\"asynchronousdefinition\":\"false\",\"exclusivedefinition\":\"false\",\"executionlisteners\":\"\",\"multiinstance_type\":\"None\",\"multiinstance_cardinality\":\"\",\"multiinstance_collection\":\"\",\"multiinstance_variable\":\"\",\"multiinstance_condition\":\"\"},\"stencil\":{\"id\":\"SubProcess\"},\"childShapes\":[],\"outgoing\":[],\"bounds\":{\"lowerRight\":{\"x\":365.25,\"y\":167},\"upperLeft\":{\"x\":165.25,\"y\":7}},\"dockers\":[]},{\"resourceId\":\"sid-9A4F827E-6C0D-4D34-A98F-EFEE5A48D989\",\"properties\":{\"overrideid\":\"\",\"name\":\"\",\"documentation\":\"\",\"executionlisteners\":\"\"},\"stencil\":{\"id\":\"EndNoneEvent\"},\"childShapes\":[],\"outgoing\":[],\"bounds\":{\"lowerRight\":{\"x\":438.25,\"y\":101},\"upperLeft\":{\"x\":410.25,\"y\":73}},\"dockers\":[]}],\"bounds\":{\"lowerRight\":{\"x\":1200,\"y\":1050},\"upperLeft\":{\"x\":0,\"y\":0}},\"stencilset\":{\"url\":\"stencilsets/bpmn2.0/bpmn2.0.json\",\"namespace\":\"http://b3mn.org/stencilset/bpmn2.0#\"},\"ssextensions\":[]}',NULL),('2502',1,'source',NULL,'{\"id\":\"canvas\",\"resourceId\":\"canvas\",\"stencilset\":{\"namespace\":\"http://b3mn.org/stencilset/bpmn2.0#\"}}',NULL),('3',4,'source-extra',NULL,'âPNG\r\n\Z\n\0\0\0\rIHDR\0\0Ë\0\0\0Ÿ\0\0\0Î£∞\0\0\0 cHRM\0\0z&\0\0ÄÑ\0\0˙\0\0\0ÄË\0\0u0\0\0Í`\0\0:ò\0\0pú∫Q<\0\0\0gAMA\0\0±é|˚Qì\0\0\0sRGB\0ÆŒÈ\0\0\0bKGD\0ˇ\0ˇ\0ˇ†Ωßì\0\0\0	pHYs\0\0ƒ\0\0ƒï+\0\0ﬁIDATx⁄Ì›Oä⁄`¿acƒœÄ‚_DBW∫pÂ1\\t1C/–ªÃf1sá^ ‡âJ°ãR™÷~Åv=ª&:œb‹æ~º1∆N\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0‡\râ\0ˇè«ß”iï$…–4@†ÅÊÇ<âA>ƒ äØ˝ız]ô\n4–‡¶|π\\ûbê„«êeŸi±X§√·∞BË§ijH –¿ˇTU’«Ê◊x8ÕÛ¸\\E4\Z¥Lœ‡›lÕΩ∏5?«8ûÕfﬂ7õM7nŒ}ì4–`úœÁÛóxxXØ◊ø ≤Ï\'â”l–@£ÍÕπéÛn∑ª,óK[3‹ÄÆ¿}´™Í°æ¨7Áü1ŒÓ˛ÅöVﬂ≠„¸2ùNøñe90∏.q√´JﬂF€Ì6ıù3ÿ†Åvlœì∏=?‰y˛#À24–ü6(ä¬•m∞AmQ?æ3ÑÕCH@†ÅvŸœÁsSÄÂ7‹Ø’x<˛m`ÉZ&Ñ‡Å⁄∆øRÅ@\0\r\0\r\04\0 –\0 –\0Ä@Ä@\0\r\0\r\04\04\0 –\0Ä@Ä@\0\r\0\r\04\04\0 –\0Ä@Ä@\0\r\0\r\04\04\0 –\0Ä@Ä@\0\r\0\r\04\04\0 –\0Ä@Ä@\0\r\0\r\04\04\0 –\0Ä@Ä@\0\r\0\r\04\04\0 –\0Ä@Ä@\0\r\0\r\04\04\0 –\0Ä@Ä@\0\r\0\r\04\04\0 –\0Ä@Ä@\0\r\0\r\04\04\0 –\0Ä@Ä@\0\r\0\r\04\04\0 –\0Ä@Ä@\0\r\0\r\04\04\0 –\0Ä@Ä@\0\r\0\r\04\04\0 –\0Ä@Ä@\0\r\0\r\04\04\0 –\0 –\0Ä@\0\r\0\r\04\04\0 –\0 –\0Ä@\0\r\0\r\04\04\0 –\0 –\0Ä@\0\r\0\r\04\04\0 –\0 –\0Ä@\0\r\0\r\04\04\0 –\0 –\0Ä@\0\r\0\r\04\04\0 –\0 –\0Ä@\0\r\0\r\04\04\0 –\0 –\0Ä@\0\r\0\r\04\04\0 –\0 –\0Ä@\0\r\0\r\04\04\0 –\0 –\0Ä@\0\r\0\r\04\04\0 –\0 –\0Ä@\0\r\0\r\04\04\0 –\0 –\0Ä@\0\r\0\r\04\04\0 –\0 –\0Ä@\0\r\0\r\04\04\0 –\0 –\0Ä@Ä@\0\r\04\04\0 –\0 –\0Ä@Ä@\0≠ÚB±\\∑≤ıRˆ\0\0\0\0IENDÆB`Ç',NULL),('5002',1,'source',NULL,'{\"id\":\"canvas\",\"resourceId\":\"canvas\",\"stencilset\":{\"namespace\":\"http://b3mn.org/stencilset/bpmn2.0#\"}}',NULL),('7502',2,'source',NULL,'{\"resourceId\":\"7501\",\"properties\":{\"process_id\":\"process\",\"name\":\"\",\"documentation\":\"\",\"process_author\":\"\",\"process_version\":\"\",\"process_namespace\":\"http://www.activiti.org/processdef\",\"executionlisteners\":\"\",\"eventlisteners\":\"\",\"signaldefinitions\":\"\",\"messagedefinitions\":\"\"},\"stencil\":{\"id\":\"BPMNDiagram\"},\"childShapes\":[{\"resourceId\":\"sid-BEABF384-4BE1-4061-8E9A-E16988D85EC9\",\"properties\":{\"overrideid\":\"\",\"name\":\"\",\"documentation\":\"\",\"executionlisteners\":\"\",\"initiator\":\"\",\"formkeydefinition\":\"\",\"formproperties\":\"\"},\"stencil\":{\"id\":\"StartNoneEvent\"},\"childShapes\":[],\"outgoing\":[],\"bounds\":{\"lowerRight\":{\"x\":113,\"y\":108},\"upperLeft\":{\"x\":83,\"y\":78}},\"dockers\":[]}],\"bounds\":{\"lowerRight\":{\"x\":1200,\"y\":1050},\"upperLeft\":{\"x\":0,\"y\":0}},\"stencilset\":{\"url\":\"stencilsets/bpmn2.0/bpmn2.0.json\",\"namespace\":\"http://b3mn.org/stencilset/bpmn2.0#\"},\"ssextensions\":[]}',NULL);

/*Table structure for table `act_ge_property` */

DROP TABLE IF EXISTS `act_ge_property`;

CREATE TABLE `act_ge_property` (
  `NAME_` varchar(64) collate utf8_bin NOT NULL default '',
  `VALUE_` varchar(300) collate utf8_bin default NULL,
  `REV_` int(11) default NULL,
  PRIMARY KEY  (`NAME_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_ge_property` */

insert  into `act_ge_property`(`NAME_`,`VALUE_`,`REV_`) values ('next.dbid','12501',6),('schema.history','create(5.22.0.0)',1),('schema.version','5.22.0.0',1);

/*Table structure for table `act_hi_actinst` */

DROP TABLE IF EXISTS `act_hi_actinst`;

CREATE TABLE `act_hi_actinst` (
  `ID_` varchar(64) collate utf8_bin NOT NULL,
  `PROC_DEF_ID_` varchar(64) collate utf8_bin NOT NULL,
  `PROC_INST_ID_` varchar(64) collate utf8_bin NOT NULL,
  `EXECUTION_ID_` varchar(64) collate utf8_bin NOT NULL,
  `ACT_ID_` varchar(255) collate utf8_bin NOT NULL,
  `TASK_ID_` varchar(64) collate utf8_bin default NULL,
  `CALL_PROC_INST_ID_` varchar(64) collate utf8_bin default NULL,
  `ACT_NAME_` varchar(255) collate utf8_bin default NULL,
  `ACT_TYPE_` varchar(255) collate utf8_bin NOT NULL,
  `ASSIGNEE_` varchar(255) collate utf8_bin default NULL,
  `START_TIME_` datetime NOT NULL,
  `END_TIME_` datetime default NULL,
  `DURATION_` bigint(20) default NULL,
  `TENANT_ID_` varchar(255) collate utf8_bin default '',
  PRIMARY KEY  (`ID_`),
  KEY `ACT_IDX_HI_ACT_INST_START` (`START_TIME_`),
  KEY `ACT_IDX_HI_ACT_INST_END` (`END_TIME_`),
  KEY `ACT_IDX_HI_ACT_INST_PROCINST` (`PROC_INST_ID_`,`ACT_ID_`),
  KEY `ACT_IDX_HI_ACT_INST_EXEC` (`EXECUTION_ID_`,`ACT_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_hi_actinst` */

/*Table structure for table `act_hi_attachment` */

DROP TABLE IF EXISTS `act_hi_attachment`;

CREATE TABLE `act_hi_attachment` (
  `ID_` varchar(64) collate utf8_bin NOT NULL,
  `REV_` int(11) default NULL,
  `USER_ID_` varchar(255) collate utf8_bin default NULL,
  `NAME_` varchar(255) collate utf8_bin default NULL,
  `DESCRIPTION_` varchar(4000) collate utf8_bin default NULL,
  `TYPE_` varchar(255) collate utf8_bin default NULL,
  `TASK_ID_` varchar(64) collate utf8_bin default NULL,
  `PROC_INST_ID_` varchar(64) collate utf8_bin default NULL,
  `URL_` varchar(4000) collate utf8_bin default NULL,
  `CONTENT_ID_` varchar(64) collate utf8_bin default NULL,
  `TIME_` datetime default NULL,
  PRIMARY KEY  (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_hi_attachment` */

/*Table structure for table `act_hi_comment` */

DROP TABLE IF EXISTS `act_hi_comment`;

CREATE TABLE `act_hi_comment` (
  `ID_` varchar(64) collate utf8_bin NOT NULL,
  `TYPE_` varchar(255) collate utf8_bin default NULL,
  `TIME_` datetime NOT NULL,
  `USER_ID_` varchar(255) collate utf8_bin default NULL,
  `TASK_ID_` varchar(64) collate utf8_bin default NULL,
  `PROC_INST_ID_` varchar(64) collate utf8_bin default NULL,
  `ACTION_` varchar(255) collate utf8_bin default NULL,
  `MESSAGE_` varchar(4000) collate utf8_bin default NULL,
  `FULL_MSG_` longblob,
  PRIMARY KEY  (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_hi_comment` */

/*Table structure for table `act_hi_detail` */

DROP TABLE IF EXISTS `act_hi_detail`;

CREATE TABLE `act_hi_detail` (
  `ID_` varchar(64) collate utf8_bin NOT NULL,
  `TYPE_` varchar(255) collate utf8_bin NOT NULL,
  `PROC_INST_ID_` varchar(64) collate utf8_bin default NULL,
  `EXECUTION_ID_` varchar(64) collate utf8_bin default NULL,
  `TASK_ID_` varchar(64) collate utf8_bin default NULL,
  `ACT_INST_ID_` varchar(64) collate utf8_bin default NULL,
  `NAME_` varchar(255) collate utf8_bin NOT NULL,
  `VAR_TYPE_` varchar(255) collate utf8_bin default NULL,
  `REV_` int(11) default NULL,
  `TIME_` datetime NOT NULL,
  `BYTEARRAY_ID_` varchar(64) collate utf8_bin default NULL,
  `DOUBLE_` double default NULL,
  `LONG_` bigint(20) default NULL,
  `TEXT_` varchar(4000) collate utf8_bin default NULL,
  `TEXT2_` varchar(4000) collate utf8_bin default NULL,
  PRIMARY KEY  (`ID_`),
  KEY `ACT_IDX_HI_DETAIL_PROC_INST` (`PROC_INST_ID_`),
  KEY `ACT_IDX_HI_DETAIL_ACT_INST` (`ACT_INST_ID_`),
  KEY `ACT_IDX_HI_DETAIL_TIME` (`TIME_`),
  KEY `ACT_IDX_HI_DETAIL_NAME` (`NAME_`),
  KEY `ACT_IDX_HI_DETAIL_TASK_ID` (`TASK_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_hi_detail` */

/*Table structure for table `act_hi_identitylink` */

DROP TABLE IF EXISTS `act_hi_identitylink`;

CREATE TABLE `act_hi_identitylink` (
  `ID_` varchar(64) collate utf8_bin NOT NULL default '',
  `GROUP_ID_` varchar(255) collate utf8_bin default NULL,
  `TYPE_` varchar(255) collate utf8_bin default NULL,
  `USER_ID_` varchar(255) collate utf8_bin default NULL,
  `TASK_ID_` varchar(64) collate utf8_bin default NULL,
  `PROC_INST_ID_` varchar(64) collate utf8_bin default NULL,
  PRIMARY KEY  (`ID_`),
  KEY `ACT_IDX_HI_IDENT_LNK_USER` (`USER_ID_`),
  KEY `ACT_IDX_HI_IDENT_LNK_TASK` (`TASK_ID_`),
  KEY `ACT_IDX_HI_IDENT_LNK_PROCINST` (`PROC_INST_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_hi_identitylink` */

/*Table structure for table `act_hi_procinst` */

DROP TABLE IF EXISTS `act_hi_procinst`;

CREATE TABLE `act_hi_procinst` (
  `ID_` varchar(64) collate utf8_bin NOT NULL,
  `PROC_INST_ID_` varchar(64) collate utf8_bin NOT NULL,
  `BUSINESS_KEY_` varchar(255) collate utf8_bin default NULL,
  `PROC_DEF_ID_` varchar(64) collate utf8_bin NOT NULL,
  `START_TIME_` datetime NOT NULL,
  `END_TIME_` datetime default NULL,
  `DURATION_` bigint(20) default NULL,
  `START_USER_ID_` varchar(255) collate utf8_bin default NULL,
  `START_ACT_ID_` varchar(255) collate utf8_bin default NULL,
  `END_ACT_ID_` varchar(255) collate utf8_bin default NULL,
  `SUPER_PROCESS_INSTANCE_ID_` varchar(64) collate utf8_bin default NULL,
  `DELETE_REASON_` varchar(4000) collate utf8_bin default NULL,
  `TENANT_ID_` varchar(255) collate utf8_bin default '',
  `NAME_` varchar(255) collate utf8_bin default NULL,
  PRIMARY KEY  (`ID_`),
  UNIQUE KEY `PROC_INST_ID_` (`PROC_INST_ID_`),
  KEY `ACT_IDX_HI_PRO_INST_END` (`END_TIME_`),
  KEY `ACT_IDX_HI_PRO_I_BUSKEY` (`BUSINESS_KEY_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_hi_procinst` */

/*Table structure for table `act_hi_taskinst` */

DROP TABLE IF EXISTS `act_hi_taskinst`;

CREATE TABLE `act_hi_taskinst` (
  `ID_` varchar(64) collate utf8_bin NOT NULL,
  `PROC_DEF_ID_` varchar(64) collate utf8_bin default NULL,
  `TASK_DEF_KEY_` varchar(255) collate utf8_bin default NULL,
  `PROC_INST_ID_` varchar(64) collate utf8_bin default NULL,
  `EXECUTION_ID_` varchar(64) collate utf8_bin default NULL,
  `NAME_` varchar(255) collate utf8_bin default NULL,
  `PARENT_TASK_ID_` varchar(64) collate utf8_bin default NULL,
  `DESCRIPTION_` varchar(4000) collate utf8_bin default NULL,
  `OWNER_` varchar(255) collate utf8_bin default NULL,
  `ASSIGNEE_` varchar(255) collate utf8_bin default NULL,
  `START_TIME_` datetime NOT NULL,
  `CLAIM_TIME_` datetime default NULL,
  `END_TIME_` datetime default NULL,
  `DURATION_` bigint(20) default NULL,
  `DELETE_REASON_` varchar(4000) collate utf8_bin default NULL,
  `PRIORITY_` int(11) default NULL,
  `DUE_DATE_` datetime default NULL,
  `FORM_KEY_` varchar(255) collate utf8_bin default NULL,
  `CATEGORY_` varchar(255) collate utf8_bin default NULL,
  `TENANT_ID_` varchar(255) collate utf8_bin default '',
  PRIMARY KEY  (`ID_`),
  KEY `ACT_IDX_HI_TASK_INST_PROCINST` (`PROC_INST_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_hi_taskinst` */

/*Table structure for table `act_hi_varinst` */

DROP TABLE IF EXISTS `act_hi_varinst`;

CREATE TABLE `act_hi_varinst` (
  `ID_` varchar(64) collate utf8_bin NOT NULL,
  `PROC_INST_ID_` varchar(64) collate utf8_bin default NULL,
  `EXECUTION_ID_` varchar(64) collate utf8_bin default NULL,
  `TASK_ID_` varchar(64) collate utf8_bin default NULL,
  `NAME_` varchar(255) collate utf8_bin NOT NULL,
  `VAR_TYPE_` varchar(100) collate utf8_bin default NULL,
  `REV_` int(11) default NULL,
  `BYTEARRAY_ID_` varchar(64) collate utf8_bin default NULL,
  `DOUBLE_` double default NULL,
  `LONG_` bigint(20) default NULL,
  `TEXT_` varchar(4000) collate utf8_bin default NULL,
  `TEXT2_` varchar(4000) collate utf8_bin default NULL,
  `CREATE_TIME_` datetime default NULL,
  `LAST_UPDATED_TIME_` datetime default NULL,
  PRIMARY KEY  (`ID_`),
  KEY `ACT_IDX_HI_PROCVAR_PROC_INST` (`PROC_INST_ID_`),
  KEY `ACT_IDX_HI_PROCVAR_NAME_TYPE` (`NAME_`,`VAR_TYPE_`),
  KEY `ACT_IDX_HI_PROCVAR_TASK_ID` (`TASK_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_hi_varinst` */

/*Table structure for table `act_id_group` */

DROP TABLE IF EXISTS `act_id_group`;

CREATE TABLE `act_id_group` (
  `ID_` varchar(64) collate utf8_bin NOT NULL default '',
  `REV_` int(11) default NULL,
  `NAME_` varchar(255) collate utf8_bin default NULL,
  `TYPE_` varchar(255) collate utf8_bin default NULL,
  PRIMARY KEY  (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_id_group` */

/*Table structure for table `act_id_info` */

DROP TABLE IF EXISTS `act_id_info`;

CREATE TABLE `act_id_info` (
  `ID_` varchar(64) collate utf8_bin NOT NULL default '',
  `REV_` int(11) default NULL,
  `USER_ID_` varchar(64) collate utf8_bin default NULL,
  `TYPE_` varchar(64) collate utf8_bin default NULL,
  `KEY_` varchar(255) collate utf8_bin default NULL,
  `VALUE_` varchar(255) collate utf8_bin default NULL,
  `PASSWORD_` longblob,
  `PARENT_ID_` varchar(255) collate utf8_bin default NULL,
  PRIMARY KEY  (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_id_info` */

/*Table structure for table `act_id_membership` */

DROP TABLE IF EXISTS `act_id_membership`;

CREATE TABLE `act_id_membership` (
  `USER_ID_` varchar(64) collate utf8_bin NOT NULL default '',
  `GROUP_ID_` varchar(64) collate utf8_bin NOT NULL default '',
  PRIMARY KEY  (`USER_ID_`,`GROUP_ID_`),
  KEY `ACT_FK_MEMB_GROUP` (`GROUP_ID_`),
  CONSTRAINT `ACT_FK_MEMB_GROUP` FOREIGN KEY (`GROUP_ID_`) REFERENCES `act_id_group` (`ID_`),
  CONSTRAINT `ACT_FK_MEMB_USER` FOREIGN KEY (`USER_ID_`) REFERENCES `act_id_user` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_id_membership` */

/*Table structure for table `act_id_user` */

DROP TABLE IF EXISTS `act_id_user`;

CREATE TABLE `act_id_user` (
  `ID_` varchar(64) collate utf8_bin NOT NULL default '',
  `REV_` int(11) default NULL,
  `FIRST_` varchar(255) collate utf8_bin default NULL,
  `LAST_` varchar(255) collate utf8_bin default NULL,
  `EMAIL_` varchar(255) collate utf8_bin default NULL,
  `PWD_` varchar(255) collate utf8_bin default NULL,
  `PICTURE_ID_` varchar(64) collate utf8_bin default NULL,
  PRIMARY KEY  (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_id_user` */

/*Table structure for table `act_procdef_info` */

DROP TABLE IF EXISTS `act_procdef_info`;

CREATE TABLE `act_procdef_info` (
  `ID_` varchar(64) collate utf8_bin NOT NULL,
  `PROC_DEF_ID_` varchar(64) collate utf8_bin NOT NULL,
  `REV_` int(11) default NULL,
  `INFO_JSON_ID_` varchar(64) collate utf8_bin default NULL,
  PRIMARY KEY  (`ID_`),
  UNIQUE KEY `ACT_UNIQ_INFO_PROCDEF` (`PROC_DEF_ID_`),
  KEY `ACT_IDX_INFO_PROCDEF` (`PROC_DEF_ID_`),
  KEY `ACT_FK_INFO_JSON_BA` (`INFO_JSON_ID_`),
  CONSTRAINT `ACT_FK_INFO_JSON_BA` FOREIGN KEY (`INFO_JSON_ID_`) REFERENCES `act_ge_bytearray` (`ID_`),
  CONSTRAINT `ACT_FK_INFO_PROCDEF` FOREIGN KEY (`PROC_DEF_ID_`) REFERENCES `act_re_procdef` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_procdef_info` */

/*Table structure for table `act_re_deployment` */

DROP TABLE IF EXISTS `act_re_deployment`;

CREATE TABLE `act_re_deployment` (
  `ID_` varchar(64) collate utf8_bin NOT NULL default '',
  `NAME_` varchar(255) collate utf8_bin default NULL,
  `CATEGORY_` varchar(255) collate utf8_bin default NULL,
  `TENANT_ID_` varchar(255) collate utf8_bin default '',
  `DEPLOY_TIME_` timestamp NULL default NULL,
  PRIMARY KEY  (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_re_deployment` */

/*Table structure for table `act_re_model` */

DROP TABLE IF EXISTS `act_re_model`;

CREATE TABLE `act_re_model` (
  `ID_` varchar(64) collate utf8_bin NOT NULL,
  `REV_` int(11) default NULL,
  `NAME_` varchar(255) collate utf8_bin default NULL,
  `KEY_` varchar(255) collate utf8_bin default NULL,
  `CATEGORY_` varchar(255) collate utf8_bin default NULL,
  `CREATE_TIME_` timestamp NULL default NULL,
  `LAST_UPDATE_TIME_` timestamp NULL default NULL,
  `VERSION_` int(11) default NULL,
  `META_INFO_` varchar(4000) collate utf8_bin default NULL,
  `DEPLOYMENT_ID_` varchar(64) collate utf8_bin default NULL,
  `EDITOR_SOURCE_VALUE_ID_` varchar(64) collate utf8_bin default NULL,
  `EDITOR_SOURCE_EXTRA_VALUE_ID_` varchar(64) collate utf8_bin default NULL,
  `TENANT_ID_` varchar(255) collate utf8_bin default '',
  PRIMARY KEY  (`ID_`),
  KEY `ACT_FK_MODEL_SOURCE` (`EDITOR_SOURCE_VALUE_ID_`),
  KEY `ACT_FK_MODEL_SOURCE_EXTRA` (`EDITOR_SOURCE_EXTRA_VALUE_ID_`),
  KEY `ACT_FK_MODEL_DEPLOYMENT` (`DEPLOYMENT_ID_`),
  CONSTRAINT `ACT_FK_MODEL_DEPLOYMENT` FOREIGN KEY (`DEPLOYMENT_ID_`) REFERENCES `act_re_deployment` (`ID_`),
  CONSTRAINT `ACT_FK_MODEL_SOURCE` FOREIGN KEY (`EDITOR_SOURCE_VALUE_ID_`) REFERENCES `act_ge_bytearray` (`ID_`),
  CONSTRAINT `ACT_FK_MODEL_SOURCE_EXTRA` FOREIGN KEY (`EDITOR_SOURCE_EXTRA_VALUE_ID_`) REFERENCES `act_ge_bytearray` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_re_model` */

insert  into `act_re_model`(`ID_`,`REV_`,`NAME_`,`KEY_`,`CATEGORY_`,`CREATE_TIME_`,`LAST_UPDATE_TIME_`,`VERSION_`,`META_INFO_`,`DEPLOYMENT_ID_`,`EDITOR_SOURCE_VALUE_ID_`,`EDITOR_SOURCE_EXTRA_VALUE_ID_`,`TENANT_ID_`) values ('1',7,'modelName','modelKey',NULL,'2018-11-29 23:21:35','2018-12-27 10:35:09',1,'{\"name\":\"modelName\",\"revision\":1,\"description\":\"description\"}',NULL,'2','3',''),('10001',2,'modelName','modelKey',NULL,'2018-11-29 23:33:49','2018-11-29 23:33:49',1,'{\"name\":\"modelName\",\"revision\":1,\"description\":\"description\"}',NULL,'10002',NULL,''),('2501',2,'modelName','modelKey',NULL,'2018-11-29 23:23:08','2018-11-29 23:23:09',1,'{\"name\":\"modelName\",\"revision\":1,\"description\":\"description\"}',NULL,'2502',NULL,''),('5001',2,'modelName','modelKey',NULL,'2018-11-29 23:28:15','2018-11-29 23:28:16',1,'{\"name\":\"modelName\",\"revision\":1,\"description\":\"description\"}',NULL,'5002',NULL,''),('7501',5,'modelName','modelKey',NULL,'2018-11-29 23:31:15','2018-11-29 23:35:15',1,'{\"name\":\"modelName\",\"revision\":1,\"description\":\"description\"}',NULL,'7502','10003','');

/*Table structure for table `act_re_procdef` */

DROP TABLE IF EXISTS `act_re_procdef`;

CREATE TABLE `act_re_procdef` (
  `ID_` varchar(64) collate utf8_bin NOT NULL,
  `REV_` int(11) default NULL,
  `CATEGORY_` varchar(255) collate utf8_bin default NULL,
  `NAME_` varchar(255) collate utf8_bin default NULL,
  `KEY_` varchar(255) collate utf8_bin NOT NULL,
  `VERSION_` int(11) NOT NULL,
  `DEPLOYMENT_ID_` varchar(64) collate utf8_bin default NULL,
  `RESOURCE_NAME_` varchar(4000) collate utf8_bin default NULL,
  `DGRM_RESOURCE_NAME_` varchar(4000) collate utf8_bin default NULL,
  `DESCRIPTION_` varchar(4000) collate utf8_bin default NULL,
  `HAS_START_FORM_KEY_` tinyint(4) default NULL,
  `HAS_GRAPHICAL_NOTATION_` tinyint(4) default NULL,
  `SUSPENSION_STATE_` int(11) default NULL,
  `TENANT_ID_` varchar(255) collate utf8_bin default '',
  PRIMARY KEY  (`ID_`),
  UNIQUE KEY `ACT_UNIQ_PROCDEF` (`KEY_`,`VERSION_`,`TENANT_ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_re_procdef` */

/*Table structure for table `act_ru_event_subscr` */

DROP TABLE IF EXISTS `act_ru_event_subscr`;

CREATE TABLE `act_ru_event_subscr` (
  `ID_` varchar(64) collate utf8_bin NOT NULL,
  `REV_` int(11) default NULL,
  `EVENT_TYPE_` varchar(255) collate utf8_bin NOT NULL,
  `EVENT_NAME_` varchar(255) collate utf8_bin default NULL,
  `EXECUTION_ID_` varchar(64) collate utf8_bin default NULL,
  `PROC_INST_ID_` varchar(64) collate utf8_bin default NULL,
  `ACTIVITY_ID_` varchar(64) collate utf8_bin default NULL,
  `CONFIGURATION_` varchar(255) collate utf8_bin default NULL,
  `CREATED_` timestamp NOT NULL default CURRENT_TIMESTAMP,
  `PROC_DEF_ID_` varchar(64) collate utf8_bin default NULL,
  `TENANT_ID_` varchar(255) collate utf8_bin default '',
  PRIMARY KEY  (`ID_`),
  KEY `ACT_IDX_EVENT_SUBSCR_CONFIG_` (`CONFIGURATION_`),
  KEY `ACT_FK_EVENT_EXEC` (`EXECUTION_ID_`),
  CONSTRAINT `ACT_FK_EVENT_EXEC` FOREIGN KEY (`EXECUTION_ID_`) REFERENCES `act_ru_execution` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_ru_event_subscr` */

/*Table structure for table `act_ru_execution` */

DROP TABLE IF EXISTS `act_ru_execution`;

CREATE TABLE `act_ru_execution` (
  `ID_` varchar(64) collate utf8_bin NOT NULL default '',
  `REV_` int(11) default NULL,
  `PROC_INST_ID_` varchar(64) collate utf8_bin default NULL,
  `BUSINESS_KEY_` varchar(255) collate utf8_bin default NULL,
  `PARENT_ID_` varchar(64) collate utf8_bin default NULL,
  `PROC_DEF_ID_` varchar(64) collate utf8_bin default NULL,
  `SUPER_EXEC_` varchar(64) collate utf8_bin default NULL,
  `ACT_ID_` varchar(255) collate utf8_bin default NULL,
  `IS_ACTIVE_` tinyint(4) default NULL,
  `IS_CONCURRENT_` tinyint(4) default NULL,
  `IS_SCOPE_` tinyint(4) default NULL,
  `IS_EVENT_SCOPE_` tinyint(4) default NULL,
  `SUSPENSION_STATE_` int(11) default NULL,
  `CACHED_ENT_STATE_` int(11) default NULL,
  `TENANT_ID_` varchar(255) collate utf8_bin default '',
  `NAME_` varchar(255) collate utf8_bin default NULL,
  `LOCK_TIME_` timestamp NULL default NULL,
  PRIMARY KEY  (`ID_`),
  KEY `ACT_IDX_EXEC_BUSKEY` (`BUSINESS_KEY_`),
  KEY `ACT_FK_EXE_PROCINST` (`PROC_INST_ID_`),
  KEY `ACT_FK_EXE_PARENT` (`PARENT_ID_`),
  KEY `ACT_FK_EXE_SUPER` (`SUPER_EXEC_`),
  KEY `ACT_FK_EXE_PROCDEF` (`PROC_DEF_ID_`),
  CONSTRAINT `ACT_FK_EXE_PARENT` FOREIGN KEY (`PARENT_ID_`) REFERENCES `act_ru_execution` (`ID_`),
  CONSTRAINT `ACT_FK_EXE_PROCDEF` FOREIGN KEY (`PROC_DEF_ID_`) REFERENCES `act_re_procdef` (`ID_`),
  CONSTRAINT `ACT_FK_EXE_PROCINST` FOREIGN KEY (`PROC_INST_ID_`) REFERENCES `act_ru_execution` (`ID_`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ACT_FK_EXE_SUPER` FOREIGN KEY (`SUPER_EXEC_`) REFERENCES `act_ru_execution` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_ru_execution` */

/*Table structure for table `act_ru_identitylink` */

DROP TABLE IF EXISTS `act_ru_identitylink`;

CREATE TABLE `act_ru_identitylink` (
  `ID_` varchar(64) collate utf8_bin NOT NULL default '',
  `REV_` int(11) default NULL,
  `GROUP_ID_` varchar(255) collate utf8_bin default NULL,
  `TYPE_` varchar(255) collate utf8_bin default NULL,
  `USER_ID_` varchar(255) collate utf8_bin default NULL,
  `TASK_ID_` varchar(64) collate utf8_bin default NULL,
  `PROC_INST_ID_` varchar(64) collate utf8_bin default NULL,
  `PROC_DEF_ID_` varchar(64) collate utf8_bin default NULL,
  PRIMARY KEY  (`ID_`),
  KEY `ACT_IDX_IDENT_LNK_USER` (`USER_ID_`),
  KEY `ACT_IDX_IDENT_LNK_GROUP` (`GROUP_ID_`),
  KEY `ACT_IDX_ATHRZ_PROCEDEF` (`PROC_DEF_ID_`),
  KEY `ACT_FK_TSKASS_TASK` (`TASK_ID_`),
  KEY `ACT_FK_IDL_PROCINST` (`PROC_INST_ID_`),
  CONSTRAINT `ACT_FK_ATHRZ_PROCEDEF` FOREIGN KEY (`PROC_DEF_ID_`) REFERENCES `act_re_procdef` (`ID_`),
  CONSTRAINT `ACT_FK_IDL_PROCINST` FOREIGN KEY (`PROC_INST_ID_`) REFERENCES `act_ru_execution` (`ID_`),
  CONSTRAINT `ACT_FK_TSKASS_TASK` FOREIGN KEY (`TASK_ID_`) REFERENCES `act_ru_task` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_ru_identitylink` */

/*Table structure for table `act_ru_job` */

DROP TABLE IF EXISTS `act_ru_job`;

CREATE TABLE `act_ru_job` (
  `ID_` varchar(64) collate utf8_bin NOT NULL,
  `REV_` int(11) default NULL,
  `TYPE_` varchar(255) collate utf8_bin NOT NULL,
  `LOCK_EXP_TIME_` timestamp NULL default NULL,
  `LOCK_OWNER_` varchar(255) collate utf8_bin default NULL,
  `EXCLUSIVE_` tinyint(1) default NULL,
  `EXECUTION_ID_` varchar(64) collate utf8_bin default NULL,
  `PROCESS_INSTANCE_ID_` varchar(64) collate utf8_bin default NULL,
  `PROC_DEF_ID_` varchar(64) collate utf8_bin default NULL,
  `RETRIES_` int(11) default NULL,
  `EXCEPTION_STACK_ID_` varchar(64) collate utf8_bin default NULL,
  `EXCEPTION_MSG_` varchar(4000) collate utf8_bin default NULL,
  `DUEDATE_` timestamp NULL default NULL,
  `REPEAT_` varchar(255) collate utf8_bin default NULL,
  `HANDLER_TYPE_` varchar(255) collate utf8_bin default NULL,
  `HANDLER_CFG_` varchar(4000) collate utf8_bin default NULL,
  `TENANT_ID_` varchar(255) collate utf8_bin default '',
  PRIMARY KEY  (`ID_`),
  KEY `ACT_FK_JOB_EXCEPTION` (`EXCEPTION_STACK_ID_`),
  CONSTRAINT `ACT_FK_JOB_EXCEPTION` FOREIGN KEY (`EXCEPTION_STACK_ID_`) REFERENCES `act_ge_bytearray` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_ru_job` */

/*Table structure for table `act_ru_task` */

DROP TABLE IF EXISTS `act_ru_task`;

CREATE TABLE `act_ru_task` (
  `ID_` varchar(64) collate utf8_bin NOT NULL default '',
  `REV_` int(11) default NULL,
  `EXECUTION_ID_` varchar(64) collate utf8_bin default NULL,
  `PROC_INST_ID_` varchar(64) collate utf8_bin default NULL,
  `PROC_DEF_ID_` varchar(64) collate utf8_bin default NULL,
  `NAME_` varchar(255) collate utf8_bin default NULL,
  `PARENT_TASK_ID_` varchar(64) collate utf8_bin default NULL,
  `DESCRIPTION_` varchar(4000) collate utf8_bin default NULL,
  `TASK_DEF_KEY_` varchar(255) collate utf8_bin default NULL,
  `OWNER_` varchar(255) collate utf8_bin default NULL,
  `ASSIGNEE_` varchar(255) collate utf8_bin default NULL,
  `DELEGATION_` varchar(64) collate utf8_bin default NULL,
  `PRIORITY_` int(11) default NULL,
  `CREATE_TIME_` timestamp NULL default NULL,
  `DUE_DATE_` datetime default NULL,
  `CATEGORY_` varchar(255) collate utf8_bin default NULL,
  `SUSPENSION_STATE_` int(11) default NULL,
  `TENANT_ID_` varchar(255) collate utf8_bin default '',
  `FORM_KEY_` varchar(255) collate utf8_bin default NULL,
  PRIMARY KEY  (`ID_`),
  KEY `ACT_IDX_TASK_CREATE` (`CREATE_TIME_`),
  KEY `ACT_FK_TASK_EXE` (`EXECUTION_ID_`),
  KEY `ACT_FK_TASK_PROCINST` (`PROC_INST_ID_`),
  KEY `ACT_FK_TASK_PROCDEF` (`PROC_DEF_ID_`),
  CONSTRAINT `ACT_FK_TASK_EXE` FOREIGN KEY (`EXECUTION_ID_`) REFERENCES `act_ru_execution` (`ID_`),
  CONSTRAINT `ACT_FK_TASK_PROCDEF` FOREIGN KEY (`PROC_DEF_ID_`) REFERENCES `act_re_procdef` (`ID_`),
  CONSTRAINT `ACT_FK_TASK_PROCINST` FOREIGN KEY (`PROC_INST_ID_`) REFERENCES `act_ru_execution` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_ru_task` */

/*Table structure for table `act_ru_variable` */

DROP TABLE IF EXISTS `act_ru_variable`;

CREATE TABLE `act_ru_variable` (
  `ID_` varchar(64) collate utf8_bin NOT NULL,
  `REV_` int(11) default NULL,
  `TYPE_` varchar(255) collate utf8_bin NOT NULL,
  `NAME_` varchar(255) collate utf8_bin NOT NULL,
  `EXECUTION_ID_` varchar(64) collate utf8_bin default NULL,
  `PROC_INST_ID_` varchar(64) collate utf8_bin default NULL,
  `TASK_ID_` varchar(64) collate utf8_bin default NULL,
  `BYTEARRAY_ID_` varchar(64) collate utf8_bin default NULL,
  `DOUBLE_` double default NULL,
  `LONG_` bigint(20) default NULL,
  `TEXT_` varchar(4000) collate utf8_bin default NULL,
  `TEXT2_` varchar(4000) collate utf8_bin default NULL,
  PRIMARY KEY  (`ID_`),
  KEY `ACT_IDX_VARIABLE_TASK_ID` (`TASK_ID_`),
  KEY `ACT_FK_VAR_EXE` (`EXECUTION_ID_`),
  KEY `ACT_FK_VAR_PROCINST` (`PROC_INST_ID_`),
  KEY `ACT_FK_VAR_BYTEARRAY` (`BYTEARRAY_ID_`),
  CONSTRAINT `ACT_FK_VAR_BYTEARRAY` FOREIGN KEY (`BYTEARRAY_ID_`) REFERENCES `act_ge_bytearray` (`ID_`),
  CONSTRAINT `ACT_FK_VAR_EXE` FOREIGN KEY (`EXECUTION_ID_`) REFERENCES `act_ru_execution` (`ID_`),
  CONSTRAINT `ACT_FK_VAR_PROCINST` FOREIGN KEY (`PROC_INST_ID_`) REFERENCES `act_ru_execution` (`ID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `act_ru_variable` */

/*Table structure for table `ingrid_datasource` */

DROP TABLE IF EXISTS `ingrid_datasource`;

CREATE TABLE `ingrid_datasource` (
  `poolName` varchar(32) collate utf8_bin NOT NULL default '',
  `driverClassName` varchar(256) collate utf8_bin default NULL,
  `jdbcUrl` varchar(256) collate utf8_bin default NULL,
  `username` varchar(32) collate utf8_bin default NULL,
  `password` varchar(32) collate utf8_bin default NULL,
  `maxPoolSize` int(11) default NULL,
  `connectionTimeout` bigint(20) default NULL,
  `minIdle` int(11) default NULL,
  `idleTimeout` bigint(20) default NULL,
  PRIMARY KEY  (`poolName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `ingrid_datasource` */


DROP TABLE IF EXISTS `ingrid_method`;

CREATE TABLE `ingrid_method` (
  `methodId` bigint(20) NOT NULL auto_increment,
  `methodName` varchar(64) collate utf8_bin NOT NULL,
  `document` varchar(255) collate utf8_bin default NULL,
  `poolName` varchar(32) collate utf8_bin default NULL,
  `outParam` varchar(2000) collate utf8_bin default NULL,
  `sqlType` varchar(16) collate utf8_bin default NULL,
  `rsStatus` tinyint(1) default NULL,
  PRIMARY KEY  (`methodId`),
  UNIQUE KEY `methodName` (`methodName`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `ingrid_method` */

insert  into `ingrid_method`(`methodId`,`methodName`,`document`,`poolName`,`outParam`,`sqlType`,`rsStatus`) values (68,'testsssss','','normal','ssssssss','LISTONLY',1),(69,'testsssss1','','normal','ssssssss','LISTONLY',1),(70,'WeixinSend','‰∏âÁîü‰∏â‰∏ñ','normal','aaa,ccc','PROCEDURE',1),(71,'xiaosddLoad','www ','erp','','PROCEDURE',1),(72,'PROC_MM_KUC_JIED_LOAD','ÂØπÂØπÂØπ','erp','','PROCEDURE',0),(73,'PROC_MM_CAIG_RUK_TWO','ÊòØÂï•','erp','out_Flag,out_nszRtn','PROCEDURE',1),(74,'PROC_SD_SHIX_FENY_RPT','ÊµãËØï','erp','out_zongtNum','PROCEDURE',1),(75,'testsssss3','','normal','ssssssss','LISTONLY',1),(76,'testsssss2','','normal','ssssssss','LISTONLY',1),(77,'testsssss4','','normal','ssssssss','LISTONLY',1),(78,'testsssss6s','ssss','normal','ssssssss','LISTONLY',1),(79,'testssss8888888','eeee','normal','ssssssss','LISTONLY',1),(80,'PROC_MM_KUC_JIED_LOAD1','ÂØπÂØπÂØπ','erp','','PROCEDURE',0),(81,'PROC_MM_KUC_JIED_LOAD11','ÂØπÂØπÂØπ','erp','','PROCEDURE',0),(82,'PROC_MM_KUC_JIED_LOAD14','ÂØπÂØπÂØπ1','erp','','PROCEDURE',0),(83,'passportAdd','ÈÄöË°åËØÅÂàõÂª∫','normal','','TRANSITION',0),(84,'passportEdit','ÈÄöË°åËØÅ‰øÆÊîπ','normal','','TRANSITION',0),(85,'passportQuery','ÈÄöË°åËØÅÊü•ËØ¢','normal','','LISTONLY',1),(86,'ingrid_passportEdit','ÈÄöË°åËØÅÁºñËæë','normal','','TRANSITION',0),(87,'passportRemove','ÈÄöË°åËØÅÂà†Èô§','normal','','TRANSITION',0),(88,'userQuery','Áî®Êà∑Êü•ËØ¢','normal','','LISTONLY',1),(89,'ingrid_userAdd','Áî®Êà∑ÂàõÂª∫','normal','','TRANSITION',0),(90,'userAdd','Áî®Êà∑ÂàõÂª∫','normal','','TRANSITION',0),(91,'userEdit','Áî®Êà∑‰øÆÊîπ','normal','','TRANSITION',0),(92,'userRemove','Áî®Êà∑Âà†Èô§','normal','','TRANSITION',0),(93,'passportBind','ÈÄöË°åËØÅÁªëÂÆö','normal','','TRANSITION',0),(94,'platformQuery','Âπ≥Âè∞Êü•ËØ¢','normal','','LISTONLY',1),(95,'platformAdd','Âπ≥Âè∞Êñ∞Â¢û','normal','','TRANSITION',0),(96,'platformEdit','Âπ≥Âè∞‰øÆÊîπ','normal','','TRANSITION',0),(97,'platformRemove','Âπ≥Âè∞Âà†Èô§','normal','','TRANSITION',0),(98,'ingrid_passportAdd','ÈÄöË°åËØÅÊñ∞Â¢û','normal','','TRANSITION',0),(99,'ingrid_reportQuery','Âä†ËΩΩÊâÄÊúâÊä•Ë°®','normal','','LISTONLY',1),(100,'reportQuery','Âä†ËΩΩÊâÄÊúâÊä•Ë°®','normal','','LISTONLY',1),(101,'PROC_MM_CAIG_LOAD_ONE','ÈááË¥≠ÂàóË°®Âä†ËΩΩ','erp','','PROCEDURE',1),(102,'PROC_MM_CAIG_LIST_LOAD_ONE','Âä†ËΩΩÈááË¥≠ËÆ¢ÂçïÊòéÁªÜ','erp','','PROCEDURE',1),(103,'PROC_SYS_RECORD_ORGTOCAIGMINI_LOAD','ÈááË¥≠ÈÉ®Èó®Âä†ËΩΩ','erp','','PROCEDURE',1),(104,'PROC_SYS_GONGYSTANCHUANG_LOAD','‰æõÂ∫îÂïÜ','erp','out_Flag,out_nszRtn','PROCEDURE',1),(105,'PROC_SYS_RECORD_SHANGPTOCAIG_LOAD','ÂïÜÂìÅÂàóË°®Âä†ËΩΩ','erp','out_Flag,out_nszRtn','PROCEDURE',1),(106,'PROC_MM_CAIG_DINGD_ADD','ÈááË¥≠ËÆ¢ÂçïÂàõÂª∫','erp','out_Flag,out_nszRtn','PROCEDURE',0),(107,'PROC_MM_CAIG_QINGH','ÈááË¥≠ËÆ¢ÂçïÊ∏ÖÊ†∏','erp','out_Flag,out_nszRtn','PROCEDURE',0),(108,'PROC_MM_CAIG_CHANGJNO_WEIH','ÈááË¥≠ÂéÇÂÆ∂ÂçïÂè∑Áª¥Êä§','erp','out_Flag,out_nszRtn','PROCEDURE',0),(109,'PROC_MM_CAIG_DINGD_CANCEL','ÈááË¥≠ËÆ¢ÂçïÂÖ≥Èó≠','erp','out_Flag,out_nszRtn','PROCEDURE',0),(110,'PROC_MM_CAIG_FAH_ADD','ÈááË¥≠ÂèëË¥ß','erp','out_Flag,out_nszRtn','PROCEDURE',0),(111,'addCaigdd','Ê∑ªÂä†ÈááË¥≠Âçï','erp','','TRANSITION',1);

/*Table structure for table `ingrid_method_sql` */

DROP TABLE IF EXISTS `ingrid_method_sql`;

CREATE TABLE `ingrid_method_sql` (
  `methodId` bigint(20) default NULL,
  `line` int(11) default NULL,
  `content` varchar(2000) collate utf8_bin default NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `ingrid_method_sql` */

insert  into `ingrid_method_sql`(`methodId`,`line`,`content`) values (70,0,'call WeixinSend ( :messageId, :weixinId, :signature, :timestamp, :nonce, :openId, :msgSignature, :encryptType, :toUserName, :fromUserName, :msgType, :content, :msgId, :createTime, :mediaId, :picUrl, :thumbMediaId, :aaa, :ccc )'),(74,0,'exec PROC_SD_SHIX_FENY_RPT :in_yonghID, :in_tuihNo, :in_xiaosNo, :in_tuihckNo, :in_kehCode, :in_kehName, :in_yewOrgID, :in_yewyID, :in_chuangjTimeStart, :in_chuangjTimeEnd, :in_yeNo, :in_tiaosNum, :out_zongtNum'),(71,0,'exec PROC_SD_XIAOS_DINGD_GUANL_LOAD \n:in_yonghID	,\n:in_xiaosNo,\n:in_cankNo ,\n:in_kehName,\n:in_yewOrgID ,\n:in_shouhMan ,\n:in_shouhTel ,\n:in_shouhAddress,\n:in_shangpCode,\n:in_songhfsName ,\n:in_dinghDateStart ,\n:in_dinghDateEnd,\n:in_dingdRemark	,\n:in_dingdPrintFlag ,\n:in_xiaosStatus,\n:in_guaqStatus ,\n:in_xiaosCancelFlag,\n:in_chukStatus  ,\n:in_jiaoyStatusName ,\n:in_buf	,\n:in_hebFlag	\n'),(75,0,'sssss'),(69,0,'sssss'),(76,0,'sssss'),(77,0,'sssss'),(68,0,'sssss'),(78,0,'sssss'),(79,0,'sssss'),(80,0,'exec PROC_MM_KUC_JIED_LOAD :in_yonghID, :in_cangkID, :in_cangkName, :in_shangpCode, :in_changjCode, :in_pinpName, :in_pic'),(81,0,'exec PROC_MM_KUC_JIED_LOAD :in_yonghID, :in_cangkID, :in_cangkName, :in_shangpCode, :in_changjCode, :in_pinpName, :in_pic'),(82,0,'exec PROC_MM_KUC_JIED_LOAD :in_yonghID, :in_cangkID, :in_cangkName, :in_shangpCode, :in_changjCode, :in_pinpName, :in_pic\n\n\naaaa\n\naa\n\n\n111'),(73,0,'exec PROC_MM_CAIG_RUK_TWO :in_yonghID, :in_fahTitleID, :in_fahNo, :in_rukRemark, :in_jingsMan, :out_Flag, :out_nszRtn'),(72,0,'exec PROC_MM_KUC_JIED_LOAD :in_yonghID, :in_cangkID, :in_cangkName, :in_shangpCode, :in_changjCode, :in_pinpName, :in_pic'),(83,0,'insert into ingrid_passport ( \r\nplatform , appid , openid , mobile , systemUser\r\n ) values ( \r\n:platform , :appid , :openid , :mobile , :systemUser )'),(86,0,'update ingrid_passport set \nplatform = :platform , appid = :appid , openid = :openid , mobile = :mobile , systemUser = :systemUser\n where \nplatform = :platform , appid = :appid , openid = :openid '),(89,0,'insert into ingrid_user ( \r\nuserName , password , createTime\r\n ) values ( \r\n:userName , :password , :createTime )'),(95,0,'insert into ingrid_platform ( \nplatform , appid , appsecret , status\n ) values ( \n:platform , :appid , :appsecret , :status )'),(96,0,'update ingrid_platform set \nplatform = :platform , appid = :appid , appsecret = :appsecret , status = :status\n where \nplatformId = :platformId'),(98,0,'insert into ingrid_passport ( \r\nplatformId , openid , mobile , systemUser\r\n ) values ( \r\n:platformId , :openid , :mobile , :systemUser )'),(84,0,'update ingrid_passport set \nplatformId = :platformId , openid = :openid , mobile = :mobile , systemUser = :systemUser\n where \nplatformId = :platformId , openid = :openid'),(87,0,'delete from ingrid_passport where \nplatformId = :platformId , openid = :openid'),(97,0,'delete from ingrid_platform where \nplatformId = :platformId '),(85,0,'select platformId , openid , mobile , systemUser , u.userName , u.password\n from ingrid_passport p, ingrid_user u where \n p.systemUser = u.userName and platformId = :platformId and openid = :openid'),(88,0,'select userName , password , createTime\n from ingrid_user where \nuserName = :userName and password = :password'),(91,0,'update ingrid_user set \nuserName = :userName , password = :password , createTime = :createTime\n where \nuserId = :userId'),(92,0,'delete from ingrid_user where \nuserId = :userId'),(93,0,'update ingrid_passport set \nmobile = :mobile , systemUser = :systemUser\n where \nplatformId = :platformId , openid = :openid'),(94,0,'select platformId , platform , appid , appsecret , status\n from ingrid_platform where \nplatform = :platform and appid = :appid'),(90,0,'insert into ingrid_user ( \r\nuserName , password , createTime\r\n ) values ( \r\n:userName , :password , :createTime )'),(99,0,'select reportId , name , content , updateDate , createDate\n from ingrid_report'),(100,0,'select reportId , name  , updateDate , createDate\n from ingrid_report'),(101,0,'exec PROC_MM_CAIG_LOAD_ONE :in_yonghID, :in_cangkID, :in_gongysID, :in_pinpName, :in_shangpCode, :in_caigOrgName, :in_changjNo, :in_chuangjrName, :in_changjCode, :in_dinghDateStart, :in_dinghDateEnd, :in_caigNo, :in_caigStatus, :in_xiaoyStatus, :in_rukStatus, :in_Flag, :in_caigCancelFlag'),(102,0,'exec PROC_MM_CAIG_LIST_LOAD_ONE :in_yonghID, :in_caigTitleID'),(103,0,'exec PROC_SYS_RECORD_ORGTOCAIGMINI_LOAD :in_yonghID'),(104,0,'exec PROC_SYS_GONGYSTANCHUANG_LOAD :in_gongysID, :in_gongysName, :in_gongysCode, :in_gongysTel, :in_gongysFax, :in_gongysUseFlag, :in_orgID, :in_yonghID, :out_Flag, :out_nszRtn'),(105,0,'exec PROC_SYS_RECORD_SHANGPTOCAIG_LOAD :in_yonghID, :in_pinpName, :in_shangpCode, :in_leibName, :in_changjCode, :in_gongysID, :out_Flag, :out_nszRtn'),(106,0,'exec PROC_MM_CAIG_DINGD_ADD :in_yonghID, :in_gongysID, :in_gongysName, :in_changjNo, :in_shangpSum, :in_shangphsSum, :in_qitSum, :in_shuiSum, :in_dinghRemark, :in_listStr, :in_yudDate, :in_caigDefine4, :in_caigOrgID, :in_caigOrgName, :in_wul, :in_changj, :in_caigKuaiddNo, :out_Flag, :out_nszRtn'),(107,0,'exec PROC_MM_CAIG_QINGH :in_yonghID, :in_caigTitleID, :in_caigListID, :out_Flag, :out_nszRtn'),(108,0,'exec PROC_MM_CAIG_CHANGJNO_WEIH :in_yonghID, :in_caigTitleID, :in_oldChangjNo, :in_newChangjNo, :out_Flag, :out_nszRtn'),(109,0,'exec PROC_MM_CAIG_DINGD_CANCEL :in_yonghID, :in_caigTitleID, :out_Flag, :out_nszRtn'),(110,0,'exec PROC_MM_CAIG_FAH_ADD :in_yonghID, :in_caigTitleID, :in_cangkID, :in_cangkName, :in_fahRemark, :in_shangpSum, :in_shangphsSum, :in_qitSum, :in_shuiSum, :in_listStr, :in_caigDefine4, :in_wul, :in_changj, :in_caigKuaiddNo, :out_Flag, :out_nszRtn'),(111,0,'DECLARE @v_orgID		INT,\n	        @v_orgName		NVARCHAR(30),\n	        @v_yonghName	NVARCHAR(30),\n	        @v_caigNo		VARCHAR(20),/*Áî®‰∫é‰øùÂ≠òÁ•®Âè∑*/\n	        @v_operTime		DATETIME,\n	        @v_listStr		NVARCHAR(MAX),\n			@out_Flag		int,\n			@out_nszRtn		VARCHAR(20)\n	\n	--Ëé∑ÂèñÁ•®Âè∑\n	SELECT @v_caigNo = piaohCode\n	FROM tb_sys_record_org\n	WHERE orgID = :caigOrgID\n\n	/*ÊâßË°åËÆ°ÁÆóÁ•®Âè∑ÁöÑÂ≠òÂÇ®ËøáÁ®ã*/\n	EXEC PROC_SYS_PIAOH_ADD 6,2,@v_caigNo OUTPUT,@out_Flag OUTPUT,@out_nszRtn OUTPUT\n	insert into tb_mm_caig_title (caigOrgID,caigOrgName,gongysID,gongysName,caigNo)  values (:caigOrgID,:caigOrgName,:gongysID,:gongysName,@v_caigNo);\n	select * from tb_mm_caig_title where caigTitleID = @@IDENTITY;');

/*Table structure for table `ingrid_passport` */

DROP TABLE IF EXISTS `ingrid_passport`;

CREATE TABLE `ingrid_passport` (
  `platformId` int(11) default NULL COMMENT 'Âπ≥Âè∞ID',
  `openid` varchar(32) collate utf8_bin default NULL COMMENT 'ÂºÄÊîæID',
  `mobile` varchar(32) collate utf8_bin default NULL COMMENT 'ÁßªÂä®ÁîµËØù',
  `systemUser` varchar(32) collate utf8_bin default NULL COMMENT 'Á≥ªÁªüÁî®Êà∑'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `ingrid_passport` */

/*Table structure for table `ingrid_platform` */

DROP TABLE IF EXISTS `ingrid_platform`;

CREATE TABLE `ingrid_platform` (
  `platformId` int(11) NOT NULL auto_increment COMMENT 'Âπ≥Âè∞ID',
  `platform` varchar(32) collate utf8_bin default NULL COMMENT 'Âπ≥Âè∞',
  `appid` varchar(32) collate utf8_bin default NULL COMMENT 'Â∫îÁî®ID',
  `appsecret` varchar(32) collate utf8_bin default NULL COMMENT 'Â∫îÁî®ÁßòÈí•',
  `status` int(11) default NULL COMMENT 'Á≥ªÁªüÁî®Êà∑',
  PRIMARY KEY  (`platformId`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `ingrid_platform` */

insert  into `ingrid_platform`(`platformId`,`platform`,`appid`,`appsecret`,`status`) values (18,'aaa','aaa','11111',1);

/*Table structure for table `ingrid_report` */

DROP TABLE IF EXISTS `ingrid_report`;

CREATE TABLE `ingrid_report` (
  `reportId` bigint(20) NOT NULL auto_increment,
  `name` varchar(32) collate utf8_bin NOT NULL,
  `content` text collate utf8_bin,
  `updateDate` datetime default NULL,
  `createDate` datetime default NULL,
  PRIMARY KEY  (`reportId`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `ingrid_report` */

insert  into `ingrid_report`(`reportId`,`name`,`content`,`updateDate`,`createDate`) values (3,'ingrid-dddd.ureport.xml','<?xml version=\"1.0\" encoding=\"UTF-8\"?><ureport><cell expand=\"Down\" name=\"A1\" row=\"1\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"poolName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"B1\" row=\"1\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"driverClassName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"C1\" row=\"1\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"jdbcUrl\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"D1\" row=\"1\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"username\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"None\" name=\"A2\" row=\"2\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"B2\" row=\"2\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><zxing-value source=\"text\" category=\"qrcode\" width=\"103\" height=\"263\"><text><![CDATA[undefined]]></text></zxing-value></cell><cell expand=\"None\" name=\"C2\" row=\"2\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"D2\" row=\"2\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><chart-value><dataset dataset-name=\"www\" type=\"doughnut\" category-property=\"username\" series-property=\"connectionTimeout\" series-type=\"property\" value-property=\"connectionTimeout\" collect-type=\"min\"/></chart-value></cell><row row-number=\"1\" height=\"18\"/><row row-number=\"2\" height=\"200\"/><column col-number=\"1\" width=\"80\"/><column col-number=\"2\" width=\"80\"/><column col-number=\"3\" width=\"80\"/><column col-number=\"4\" width=\"137\"/><datasource name=\"Á≥ªÁªüÊï∞ÊçÆÊ∫ê\" type=\"buildin\"><dataset name=\"www\" type=\"sql\"><sql><![CDATA[select * from ingrid_datasource]]></sql><field name=\"poolName\"/><field name=\"driverClassName\"/><field name=\"jdbcUrl\"/><field name=\"username\"/><field name=\"password\"/><field name=\"maxPoolSize\"/><field name=\"connectionTimeout\"/><field name=\"minIdle\"/><field name=\"idleTimeout\"/></dataset></datasource><paper type=\"A4\" left-margin=\"90\" right-margin=\"90\"\n    top-margin=\"72\" bottom-margin=\"72\" paging-mode=\"fitpage\" fixrows=\"0\"\n    width=\"595\" height=\"842\" orientation=\"portrait\" html-report-align=\"left\" bg-image=\"\" html-interval-refresh-value=\"0\" column-enabled=\"false\"></paper><search-form form-position=\"up\"/></ureport>','2018-12-28 10:10:05','2018-11-22 11:53:33'),(7,'test.ureport.xml','<?xml version=\"1.0\" encoding=\"UTF-8\"?><ureport><cell expand=\"Down\" name=\"A1\" row=\"1\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"test1\" aggregate=\"group\" property=\"methodId\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"B1\" row=\"1\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"test1\" aggregate=\"group\" property=\"methodName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"C1\" row=\"1\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"test1\" aggregate=\"group\" property=\"methodName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"D1\" row=\"1\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"test1\" aggregate=\"group\" property=\"poolName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"None\" name=\"E1\" row=\"1\" col=\"5\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"F1\" row=\"1\" col=\"6\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"G1\" row=\"1\" col=\"7\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"H1\" row=\"1\" col=\"8\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"I1\" row=\"1\" col=\"9\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"J1\" row=\"1\" col=\"10\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"K1\" row=\"1\" col=\"11\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"L1\" row=\"1\" col=\"12\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"M1\" row=\"1\" col=\"13\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"N1\" row=\"1\" col=\"14\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"O1\" row=\"1\" col=\"15\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"A2\" row=\"2\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"B2\" row=\"2\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"C2\" row=\"2\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"D2\" row=\"2\" col=\"4\"><cell-style font-size=\"10\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"E2\" row=\"2\" col=\"5\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"F2\" row=\"2\" col=\"6\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"G2\" row=\"2\" col=\"7\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"H2\" row=\"2\" col=\"8\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"I2\" row=\"2\" col=\"9\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"J2\" row=\"2\" col=\"10\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"K2\" row=\"2\" col=\"11\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"L2\" row=\"2\" col=\"12\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"M2\" row=\"2\" col=\"13\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"N2\" row=\"2\" col=\"14\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"O2\" row=\"2\" col=\"15\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"A3\" row=\"3\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"B3\" row=\"3\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"C3\" row=\"3\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"D3\" row=\"3\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"E3\" row=\"3\" col=\"5\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"F3\" row=\"3\" col=\"6\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"G3\" row=\"3\" col=\"7\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"H3\" row=\"3\" col=\"8\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"I3\" row=\"3\" col=\"9\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"J3\" row=\"3\" col=\"10\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"K3\" row=\"3\" col=\"11\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"L3\" row=\"3\" col=\"12\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"M3\" row=\"3\" col=\"13\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"N3\" row=\"3\" col=\"14\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"O3\" row=\"3\" col=\"15\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><row row-number=\"1\" height=\"18\"/><row row-number=\"2\" height=\"18\"/><row row-number=\"3\" height=\"18\"/><column col-number=\"1\" width=\"80\"/><column col-number=\"2\" width=\"80\"/><column col-number=\"3\" width=\"80\"/><column col-number=\"4\" width=\"80\"/><column col-number=\"5\" width=\"74\"/><column col-number=\"6\" width=\"74\"/><column col-number=\"7\" width=\"74\"/><column col-number=\"8\" width=\"74\"/><column col-number=\"9\" width=\"74\"/><column col-number=\"10\" width=\"74\"/><column col-number=\"11\" width=\"74\"/><column col-number=\"12\" width=\"74\"/><column col-number=\"13\" width=\"74\"/><column col-number=\"14\" width=\"74\"/><column col-number=\"15\" width=\"74\"/><datasource name=\"test\" type=\"jdbc\" username=\"\" password=\"\" url=\"Êï∞ÊçÆÊ∫ê/ingrid?useUnicode=true&amp;characterEncoding=utf8&amp;allowMultiQueries=true\" driver=\"com.mysql.jdbc.Driver\"><dataset name=\"test1\" type=\"sql\"><sql><![CDATA[select * from ingrid_method]]></sql><field name=\"methodId\"/><field name=\"methodName\"/><field name=\"poolName\"/><field name=\"outParam\"/><field name=\"sqlType\"/><field name=\"rsStatus\"/></dataset></datasource><datasource name=\"Á≥ªÁªüÊï∞ÊçÆÊ∫ê\" type=\"buildin\"></datasource><paper type=\"A4\" left-margin=\"90\" right-margin=\"90\"\n    top-margin=\"72\" bottom-margin=\"72\" paging-mode=\"fitpage\" fixrows=\"0\"\n    width=\"595\" height=\"842\" orientation=\"portrait\" html-report-align=\"left\" bg-image=\"\" html-interval-refresh-value=\"0\" column-enabled=\"false\"></paper><search-form form-position=\"up\"><grid show-border=\"false\" type=\"Grid3x3x3\" border-width=\"1\" border-color=\"#cccccc\"><col size=\"4\"><input-text label=\"ËæìÂÖ•Ê°Ü1\" type=\"Text\" label-position=\"top\" bind-parameter=\"\"></input-text></col><col size=\"4\"><input-text label=\"ËæìÂÖ•Ê°Ü2\" type=\"Text\" label-position=\"top\" bind-parameter=\"\"></input-text></col><col size=\"4\"><input-text label=\"ÊµãËØï3\" type=\"Text\" label-position=\"top\" bind-parameter=\"\"></input-text></col></grid><grid show-border=\"false\" type=\"Grid2X2\" border-width=\"1\" border-color=\"#eee\"><col size=\"6\"><button-submit label=\"Êèê‰∫§2\" align=\"left\" type=\"Submit-button\" style=\"btn-default\"></button-submit></col><col size=\"6\"><button-reset label=\"ÈáçÁΩÆ2\" align=\"left\" type=\"Reset-button\" style=\"btn-default\"></button-reset></col></grid></search-form></ureport>','2018-12-28 10:09:06','2018-11-23 08:35:35'),(8,'ceshi.ureport.xml','<?xml version=\"1.0\" encoding=\"UTF-8\"?><ureport><cell expand=\"Down\" name=\"A1\" row=\"1\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"poolName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"B1\" row=\"1\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"driverClassName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"C1\" row=\"1\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"jdbcUrl\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"D1\" row=\"1\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"username\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"None\" name=\"A2\" row=\"2\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"B2\" row=\"2\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"C2\" row=\"2\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"D2\" row=\"2\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><chart-value><dataset dataset-name=\"www\" type=\"doughnut\" category-property=\"username\" series-property=\"connectionTimeout\" series-type=\"property\" value-property=\"connectionTimeout\" collect-type=\"min\"/></chart-value></cell><row row-number=\"1\" height=\"18\"/><row row-number=\"2\" height=\"200\"/><column col-number=\"1\" width=\"80\"/><column col-number=\"2\" width=\"80\"/><column col-number=\"3\" width=\"80\"/><column col-number=\"4\" width=\"137\"/><datasource name=\"Á≥ªÁªüÊï∞ÊçÆÊ∫ê\" type=\"buildin\"><dataset name=\"www\" type=\"sql\"><sql><![CDATA[select * from ingrid_datasource]]></sql><field name=\"poolName\"/><field name=\"driverClassName\"/><field name=\"jdbcUrl\"/><field name=\"username\"/><field name=\"password\"/><field name=\"maxPoolSize\"/><field name=\"connectionTimeout\"/><field name=\"minIdle\"/><field name=\"idleTimeout\"/></dataset></datasource><paper type=\"A4\" left-margin=\"90\" right-margin=\"90\"\n    top-margin=\"72\" bottom-margin=\"72\" paging-mode=\"fitpage\" fixrows=\"0\"\n    width=\"595\" height=\"842\" orientation=\"portrait\" html-report-align=\"left\" bg-image=\"\" html-interval-refresh-value=\"0\" column-enabled=\"false\"></paper></ureport>','2018-12-27 17:48:49','2018-12-27 17:48:49'),(9,'ÂìàÂìà.ureport.xml','<?xml version=\"1.0\" encoding=\"UTF-8\"?><ureport><cell expand=\"Down\" name=\"A1\" row=\"1\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"poolName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"B1\" row=\"1\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"driverClassName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"C1\" row=\"1\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"jdbcUrl\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"D1\" row=\"1\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"username\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"None\" name=\"A2\" row=\"2\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"B2\" row=\"2\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"C2\" row=\"2\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"D2\" row=\"2\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><chart-value><dataset dataset-name=\"www\" type=\"doughnut\" category-property=\"username\" series-property=\"connectionTimeout\" series-type=\"property\" value-property=\"connectionTimeout\" collect-type=\"min\"/></chart-value></cell><row row-number=\"1\" height=\"18\"/><row row-number=\"2\" height=\"200\"/><column col-number=\"1\" width=\"80\"/><column col-number=\"2\" width=\"80\"/><column col-number=\"3\" width=\"80\"/><column col-number=\"4\" width=\"137\"/><datasource name=\"Á≥ªÁªüÊï∞ÊçÆÊ∫ê\" type=\"buildin\"><dataset name=\"www\" type=\"sql\"><sql><![CDATA[select * from ingrid_datasource]]></sql><field name=\"poolName\"/><field name=\"driverClassName\"/><field name=\"jdbcUrl\"/><field name=\"username\"/><field name=\"password\"/><field name=\"maxPoolSize\"/><field name=\"connectionTimeout\"/><field name=\"minIdle\"/><field name=\"idleTimeout\"/></dataset></datasource><paper type=\"A4\" left-margin=\"90\" right-margin=\"90\"\n    top-margin=\"72\" bottom-margin=\"72\" paging-mode=\"fitpage\" fixrows=\"0\"\n    width=\"595\" height=\"842\" orientation=\"portrait\" html-report-align=\"left\" bg-image=\"\" html-interval-refresh-value=\"0\" column-enabled=\"false\"></paper></ureport>','2018-12-28 08:55:57','2018-12-28 08:55:57'),(10,'ÂìàÂìà1.ureport.xml','<?xml version=\"1.0\" encoding=\"UTF-8\"?><ureport><cell expand=\"Down\" name=\"A1\" row=\"1\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"poolName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"B1\" row=\"1\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"driverClassName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"C1\" row=\"1\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"jdbcUrl\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"D1\" row=\"1\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"username\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"None\" name=\"A2\" row=\"2\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"B2\" row=\"2\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"C2\" row=\"2\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"D2\" row=\"2\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><chart-value><dataset dataset-name=\"www\" type=\"doughnut\" category-property=\"username\" series-property=\"connectionTimeout\" series-type=\"property\" value-property=\"connectionTimeout\" collect-type=\"min\"/></chart-value></cell><row row-number=\"1\" height=\"18\"/><row row-number=\"2\" height=\"200\"/><column col-number=\"1\" width=\"80\"/><column col-number=\"2\" width=\"80\"/><column col-number=\"3\" width=\"80\"/><column col-number=\"4\" width=\"137\"/><datasource name=\"Á≥ªÁªüÊï∞ÊçÆÊ∫ê\" type=\"buildin\"><dataset name=\"www\" type=\"sql\"><sql><![CDATA[select * from ingrid_datasource]]></sql><field name=\"poolName\"/><field name=\"driverClassName\"/><field name=\"jdbcUrl\"/><field name=\"username\"/><field name=\"password\"/><field name=\"maxPoolSize\"/><field name=\"connectionTimeout\"/><field name=\"minIdle\"/><field name=\"idleTimeout\"/></dataset></datasource><paper type=\"A4\" left-margin=\"90\" right-margin=\"90\"\n    top-margin=\"72\" bottom-margin=\"72\" paging-mode=\"fitpage\" fixrows=\"0\"\n    width=\"595\" height=\"842\" orientation=\"portrait\" html-report-align=\"left\" bg-image=\"\" html-interval-refresh-value=\"0\" column-enabled=\"false\"></paper></ureport>','2018-12-28 08:56:05','2018-12-28 08:56:05'),(11,'ÂìàÂìà2.ureport.xml','<?xml version=\"1.0\" encoding=\"UTF-8\"?><ureport><cell expand=\"Down\" name=\"A1\" row=\"1\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"poolName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"B1\" row=\"1\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"driverClassName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"C1\" row=\"1\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"jdbcUrl\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"D1\" row=\"1\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"username\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"None\" name=\"A2\" row=\"2\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"B2\" row=\"2\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"C2\" row=\"2\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"D2\" row=\"2\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><chart-value><dataset dataset-name=\"www\" type=\"doughnut\" category-property=\"username\" series-property=\"connectionTimeout\" series-type=\"property\" value-property=\"connectionTimeout\" collect-type=\"min\"/></chart-value></cell><row row-number=\"1\" height=\"18\"/><row row-number=\"2\" height=\"200\"/><column col-number=\"1\" width=\"80\"/><column col-number=\"2\" width=\"80\"/><column col-number=\"3\" width=\"80\"/><column col-number=\"4\" width=\"137\"/><datasource name=\"Á≥ªÁªüÊï∞ÊçÆÊ∫ê\" type=\"buildin\"><dataset name=\"www\" type=\"sql\"><sql><![CDATA[select * from ingrid_datasource]]></sql><field name=\"poolName\"/><field name=\"driverClassName\"/><field name=\"jdbcUrl\"/><field name=\"username\"/><field name=\"password\"/><field name=\"maxPoolSize\"/><field name=\"connectionTimeout\"/><field name=\"minIdle\"/><field name=\"idleTimeout\"/></dataset></datasource><paper type=\"A4\" left-margin=\"90\" right-margin=\"90\"\n    top-margin=\"72\" bottom-margin=\"72\" paging-mode=\"fitpage\" fixrows=\"0\"\n    width=\"595\" height=\"842\" orientation=\"portrait\" html-report-align=\"left\" bg-image=\"\" html-interval-refresh-value=\"0\" column-enabled=\"false\"></paper></ureport>','2018-12-28 08:56:12','2018-12-28 08:56:12'),(12,'ÂìàÂìà3.ureport.xml','<?xml version=\"1.0\" encoding=\"UTF-8\"?><ureport><cell expand=\"Down\" name=\"A1\" row=\"1\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"poolName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"B1\" row=\"1\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"driverClassName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"C1\" row=\"1\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"jdbcUrl\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"D1\" row=\"1\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"username\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"None\" name=\"A2\" row=\"2\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"B2\" row=\"2\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"C2\" row=\"2\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"D2\" row=\"2\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><chart-value><dataset dataset-name=\"www\" type=\"doughnut\" category-property=\"username\" series-property=\"connectionTimeout\" series-type=\"property\" value-property=\"connectionTimeout\" collect-type=\"min\"/></chart-value></cell><row row-number=\"1\" height=\"18\"/><row row-number=\"2\" height=\"200\"/><column col-number=\"1\" width=\"80\"/><column col-number=\"2\" width=\"80\"/><column col-number=\"3\" width=\"80\"/><column col-number=\"4\" width=\"137\"/><datasource name=\"Á≥ªÁªüÊï∞ÊçÆÊ∫ê\" type=\"buildin\"><dataset name=\"www\" type=\"sql\"><sql><![CDATA[select * from ingrid_datasource]]></sql><field name=\"poolName\"/><field name=\"driverClassName\"/><field name=\"jdbcUrl\"/><field name=\"username\"/><field name=\"password\"/><field name=\"maxPoolSize\"/><field name=\"connectionTimeout\"/><field name=\"minIdle\"/><field name=\"idleTimeout\"/></dataset></datasource><paper type=\"A4\" left-margin=\"90\" right-margin=\"90\"\n    top-margin=\"72\" bottom-margin=\"72\" paging-mode=\"fitpage\" fixrows=\"0\"\n    width=\"595\" height=\"842\" orientation=\"portrait\" html-report-align=\"left\" bg-image=\"\" html-interval-refresh-value=\"0\" column-enabled=\"false\"></paper></ureport>','2018-12-28 08:56:21','2018-12-28 08:56:21'),(13,'ÂìàÂìà4.ureport.xml','<?xml version=\"1.0\" encoding=\"UTF-8\"?><ureport><cell expand=\"Down\" name=\"A1\" row=\"1\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"poolName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"B1\" row=\"1\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"driverClassName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"C1\" row=\"1\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"jdbcUrl\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"D1\" row=\"1\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"username\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"None\" name=\"A2\" row=\"2\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"B2\" row=\"2\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"C2\" row=\"2\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"D2\" row=\"2\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><chart-value><dataset dataset-name=\"www\" type=\"doughnut\" category-property=\"username\" series-property=\"connectionTimeout\" series-type=\"property\" value-property=\"connectionTimeout\" collect-type=\"min\"/></chart-value></cell><row row-number=\"1\" height=\"18\"/><row row-number=\"2\" height=\"200\"/><column col-number=\"1\" width=\"80\"/><column col-number=\"2\" width=\"80\"/><column col-number=\"3\" width=\"80\"/><column col-number=\"4\" width=\"137\"/><datasource name=\"Á≥ªÁªüÊï∞ÊçÆÊ∫ê\" type=\"buildin\"><dataset name=\"www\" type=\"sql\"><sql><![CDATA[select * from ingrid_datasource]]></sql><field name=\"poolName\"/><field name=\"driverClassName\"/><field name=\"jdbcUrl\"/><field name=\"username\"/><field name=\"password\"/><field name=\"maxPoolSize\"/><field name=\"connectionTimeout\"/><field name=\"minIdle\"/><field name=\"idleTimeout\"/></dataset></datasource><paper type=\"A4\" left-margin=\"90\" right-margin=\"90\"\n    top-margin=\"72\" bottom-margin=\"72\" paging-mode=\"fitpage\" fixrows=\"0\"\n    width=\"595\" height=\"842\" orientation=\"portrait\" html-report-align=\"left\" bg-image=\"\" html-interval-refresh-value=\"0\" column-enabled=\"false\"></paper></ureport>','2018-12-28 08:56:29','2018-12-28 08:56:29'),(14,'ÂìàÂìà5.ureport.xml','<?xml version=\"1.0\" encoding=\"UTF-8\"?><ureport><cell expand=\"Down\" name=\"A1\" row=\"1\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"poolName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"B1\" row=\"1\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"driverClassName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"C1\" row=\"1\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"jdbcUrl\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"D1\" row=\"1\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"username\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"None\" name=\"A2\" row=\"2\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"B2\" row=\"2\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"C2\" row=\"2\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"D2\" row=\"2\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><chart-value><dataset dataset-name=\"www\" type=\"doughnut\" category-property=\"username\" series-property=\"connectionTimeout\" series-type=\"property\" value-property=\"connectionTimeout\" collect-type=\"min\"/></chart-value></cell><row row-number=\"1\" height=\"18\"/><row row-number=\"2\" height=\"200\"/><column col-number=\"1\" width=\"80\"/><column col-number=\"2\" width=\"80\"/><column col-number=\"3\" width=\"80\"/><column col-number=\"4\" width=\"137\"/><datasource name=\"Á≥ªÁªüÊï∞ÊçÆÊ∫ê\" type=\"buildin\"><dataset name=\"www\" type=\"sql\"><sql><![CDATA[select * from ingrid_datasource]]></sql><field name=\"poolName\"/><field name=\"driverClassName\"/><field name=\"jdbcUrl\"/><field name=\"username\"/><field name=\"password\"/><field name=\"maxPoolSize\"/><field name=\"connectionTimeout\"/><field name=\"minIdle\"/><field name=\"idleTimeout\"/></dataset></datasource><paper type=\"A4\" left-margin=\"90\" right-margin=\"90\"\n    top-margin=\"72\" bottom-margin=\"72\" paging-mode=\"fitpage\" fixrows=\"0\"\n    width=\"595\" height=\"842\" orientation=\"portrait\" html-report-align=\"left\" bg-image=\"\" html-interval-refresh-value=\"0\" column-enabled=\"false\"></paper></ureport>','2018-12-28 08:56:36','2018-12-28 08:56:36'),(15,'ÂìàÂìà6.ureport.xml','<?xml version=\"1.0\" encoding=\"UTF-8\"?><ureport><cell expand=\"Down\" name=\"A1\" row=\"1\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"poolName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"B1\" row=\"1\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"driverClassName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"C1\" row=\"1\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"jdbcUrl\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"D1\" row=\"1\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"username\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"None\" name=\"A2\" row=\"2\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"B2\" row=\"2\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"C2\" row=\"2\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"D2\" row=\"2\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><chart-value><dataset dataset-name=\"www\" type=\"doughnut\" category-property=\"username\" series-property=\"connectionTimeout\" series-type=\"property\" value-property=\"connectionTimeout\" collect-type=\"min\"/></chart-value></cell><row row-number=\"1\" height=\"18\"/><row row-number=\"2\" height=\"200\"/><column col-number=\"1\" width=\"80\"/><column col-number=\"2\" width=\"80\"/><column col-number=\"3\" width=\"80\"/><column col-number=\"4\" width=\"137\"/><datasource name=\"Á≥ªÁªüÊï∞ÊçÆÊ∫ê\" type=\"buildin\"><dataset name=\"www\" type=\"sql\"><sql><![CDATA[select * from ingrid_datasource]]></sql><field name=\"poolName\"/><field name=\"driverClassName\"/><field name=\"jdbcUrl\"/><field name=\"username\"/><field name=\"password\"/><field name=\"maxPoolSize\"/><field name=\"connectionTimeout\"/><field name=\"minIdle\"/><field name=\"idleTimeout\"/></dataset></datasource><paper type=\"A4\" left-margin=\"90\" right-margin=\"90\"\n    top-margin=\"72\" bottom-margin=\"72\" paging-mode=\"fitpage\" fixrows=\"0\"\n    width=\"595\" height=\"842\" orientation=\"portrait\" html-report-align=\"left\" bg-image=\"\" html-interval-refresh-value=\"0\" column-enabled=\"false\"></paper></ureport>','2018-12-28 08:56:43','2018-12-28 08:56:43'),(16,'ÂìàÂìà7.ureport.xml','<?xml version=\"1.0\" encoding=\"UTF-8\"?><ureport><cell expand=\"Down\" name=\"A1\" row=\"1\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"poolName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"B1\" row=\"1\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"driverClassName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"C1\" row=\"1\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"jdbcUrl\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"D1\" row=\"1\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"username\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"None\" name=\"A2\" row=\"2\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"B2\" row=\"2\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"C2\" row=\"2\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"D2\" row=\"2\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><chart-value><dataset dataset-name=\"www\" type=\"doughnut\" category-property=\"username\" series-property=\"connectionTimeout\" series-type=\"property\" value-property=\"connectionTimeout\" collect-type=\"min\"/></chart-value></cell><row row-number=\"1\" height=\"18\"/><row row-number=\"2\" height=\"200\"/><column col-number=\"1\" width=\"80\"/><column col-number=\"2\" width=\"80\"/><column col-number=\"3\" width=\"80\"/><column col-number=\"4\" width=\"137\"/><datasource name=\"Á≥ªÁªüÊï∞ÊçÆÊ∫ê\" type=\"buildin\"><dataset name=\"www\" type=\"sql\"><sql><![CDATA[select * from ingrid_datasource]]></sql><field name=\"poolName\"/><field name=\"driverClassName\"/><field name=\"jdbcUrl\"/><field name=\"username\"/><field name=\"password\"/><field name=\"maxPoolSize\"/><field name=\"connectionTimeout\"/><field name=\"minIdle\"/><field name=\"idleTimeout\"/></dataset></datasource><paper type=\"A4\" left-margin=\"90\" right-margin=\"90\"\n    top-margin=\"72\" bottom-margin=\"72\" paging-mode=\"fitpage\" fixrows=\"0\"\n    width=\"595\" height=\"842\" orientation=\"portrait\" html-report-align=\"left\" bg-image=\"\" html-interval-refresh-value=\"0\" column-enabled=\"false\"></paper></ureport>','2018-12-28 08:56:57','2018-12-28 08:56:57'),(17,'ÂìàÂìà8.ureport.xml','<?xml version=\"1.0\" encoding=\"UTF-8\"?><ureport><cell expand=\"Down\" name=\"A1\" row=\"1\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"poolName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"B1\" row=\"1\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"driverClassName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"C1\" row=\"1\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"jdbcUrl\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"D1\" row=\"1\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"username\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"None\" name=\"A2\" row=\"2\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"B2\" row=\"2\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"C2\" row=\"2\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"D2\" row=\"2\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><chart-value><dataset dataset-name=\"www\" type=\"doughnut\" category-property=\"username\" series-property=\"connectionTimeout\" series-type=\"property\" value-property=\"connectionTimeout\" collect-type=\"min\"/></chart-value></cell><row row-number=\"1\" height=\"18\"/><row row-number=\"2\" height=\"200\"/><column col-number=\"1\" width=\"80\"/><column col-number=\"2\" width=\"80\"/><column col-number=\"3\" width=\"80\"/><column col-number=\"4\" width=\"137\"/><datasource name=\"Á≥ªÁªüÊï∞ÊçÆÊ∫ê\" type=\"buildin\"><dataset name=\"www\" type=\"sql\"><sql><![CDATA[select * from ingrid_datasource]]></sql><field name=\"poolName\"/><field name=\"driverClassName\"/><field name=\"jdbcUrl\"/><field name=\"username\"/><field name=\"password\"/><field name=\"maxPoolSize\"/><field name=\"connectionTimeout\"/><field name=\"minIdle\"/><field name=\"idleTimeout\"/></dataset></datasource><paper type=\"A4\" left-margin=\"90\" right-margin=\"90\"\n    top-margin=\"72\" bottom-margin=\"72\" paging-mode=\"fitpage\" fixrows=\"0\"\n    width=\"595\" height=\"842\" orientation=\"portrait\" html-report-align=\"left\" bg-image=\"\" html-interval-refresh-value=\"0\" column-enabled=\"false\"></paper></ureport>','2018-12-28 08:57:03','2018-12-28 08:57:03'),(18,'ÂìàÂìà9.ureport.xml','<?xml version=\"1.0\" encoding=\"UTF-8\"?><ureport><cell expand=\"Down\" name=\"A1\" row=\"1\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"poolName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"B1\" row=\"1\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"driverClassName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"C1\" row=\"1\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"jdbcUrl\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"D1\" row=\"1\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"username\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"None\" name=\"A2\" row=\"2\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"B2\" row=\"2\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"C2\" row=\"2\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"D2\" row=\"2\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><chart-value><dataset dataset-name=\"www\" type=\"doughnut\" category-property=\"username\" series-property=\"connectionTimeout\" series-type=\"property\" value-property=\"connectionTimeout\" collect-type=\"min\"/></chart-value></cell><row row-number=\"1\" height=\"18\"/><row row-number=\"2\" height=\"200\"/><column col-number=\"1\" width=\"80\"/><column col-number=\"2\" width=\"80\"/><column col-number=\"3\" width=\"80\"/><column col-number=\"4\" width=\"137\"/><datasource name=\"Á≥ªÁªüÊï∞ÊçÆÊ∫ê\" type=\"buildin\"><dataset name=\"www\" type=\"sql\"><sql><![CDATA[select * from ingrid_datasource]]></sql><field name=\"poolName\"/><field name=\"driverClassName\"/><field name=\"jdbcUrl\"/><field name=\"username\"/><field name=\"password\"/><field name=\"maxPoolSize\"/><field name=\"connectionTimeout\"/><field name=\"minIdle\"/><field name=\"idleTimeout\"/></dataset></datasource><paper type=\"A4\" left-margin=\"90\" right-margin=\"90\"\n    top-margin=\"72\" bottom-margin=\"72\" paging-mode=\"fitpage\" fixrows=\"0\"\n    width=\"595\" height=\"842\" orientation=\"portrait\" html-report-align=\"left\" bg-image=\"\" html-interval-refresh-value=\"0\" column-enabled=\"false\"></paper></ureport>','2018-12-28 08:57:10','2018-12-28 08:57:10'),(19,'ÂìàÂìà11.ureport.xml','<?xml version=\"1.0\" encoding=\"UTF-8\"?><ureport><cell expand=\"Down\" name=\"A1\" row=\"1\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"poolName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"B1\" row=\"1\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"driverClassName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"C1\" row=\"1\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"jdbcUrl\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"D1\" row=\"1\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"www\" aggregate=\"group\" property=\"username\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"None\" name=\"A2\" row=\"2\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"B2\" row=\"2\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"C2\" row=\"2\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1]]></simple-value></cell><cell expand=\"None\" name=\"D2\" row=\"2\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><chart-value><dataset dataset-name=\"www\" type=\"doughnut\" category-property=\"username\" series-property=\"connectionTimeout\" series-type=\"property\" value-property=\"connectionTimeout\" collect-type=\"min\"/></chart-value></cell><row row-number=\"1\" height=\"18\"/><row row-number=\"2\" height=\"200\"/><column col-number=\"1\" width=\"80\"/><column col-number=\"2\" width=\"80\"/><column col-number=\"3\" width=\"80\"/><column col-number=\"4\" width=\"137\"/><datasource name=\"Á≥ªÁªüÊï∞ÊçÆÊ∫ê\" type=\"buildin\"><dataset name=\"www\" type=\"sql\"><sql><![CDATA[select * from ingrid_datasource]]></sql><field name=\"poolName\"/><field name=\"driverClassName\"/><field name=\"jdbcUrl\"/><field name=\"username\"/><field name=\"password\"/><field name=\"maxPoolSize\"/><field name=\"connectionTimeout\"/><field name=\"minIdle\"/><field name=\"idleTimeout\"/></dataset></datasource><paper type=\"A4\" left-margin=\"90\" right-margin=\"90\"\n    top-margin=\"72\" bottom-margin=\"72\" paging-mode=\"fitpage\" fixrows=\"0\"\n    width=\"595\" height=\"842\" orientation=\"portrait\" html-report-align=\"left\" bg-image=\"\" html-interval-refresh-value=\"0\" column-enabled=\"false\"></paper></ureport>','2018-12-28 09:04:43','2018-12-28 09:04:43'),(20,'test123.ureport.xml','<?xml version=\"1.0\" encoding=\"UTF-8\"?><ureport><cell expand=\"Down\" name=\"A1\" row=\"1\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"test1\" aggregate=\"group\" property=\"methodId\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"B1\" row=\"1\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"test1\" aggregate=\"group\" property=\"methodName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"C1\" row=\"1\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"test1\" aggregate=\"group\" property=\"methodName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"Down\" name=\"D1\" row=\"1\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"><left-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><right-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><top-border width=\"1\" style=\"solid\" color=\"0,0,0\"/><bottom-border width=\"1\" style=\"solid\" color=\"0,0,0\"/></cell-style><dataset-value dataset-name=\"test1\" aggregate=\"group\" property=\"poolName\" order=\"none\" mapping-type=\"simple\"></dataset-value></cell><cell expand=\"None\" name=\"E1\" row=\"1\" col=\"5\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[1111]]></simple-value></cell><cell expand=\"None\" name=\"F1\" row=\"1\" col=\"6\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"G1\" row=\"1\" col=\"7\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"H1\" row=\"1\" col=\"8\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"I1\" row=\"1\" col=\"9\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"J1\" row=\"1\" col=\"10\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"K1\" row=\"1\" col=\"11\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"L1\" row=\"1\" col=\"12\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"M1\" row=\"1\" col=\"13\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"N1\" row=\"1\" col=\"14\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"O1\" row=\"1\" col=\"15\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"A2\" row=\"2\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"B2\" row=\"2\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"C2\" row=\"2\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"D2\" row=\"2\" col=\"4\"><cell-style font-size=\"10\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"E2\" row=\"2\" col=\"5\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"F2\" row=\"2\" col=\"6\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"G2\" row=\"2\" col=\"7\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"H2\" row=\"2\" col=\"8\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"I2\" row=\"2\" col=\"9\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"J2\" row=\"2\" col=\"10\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"K2\" row=\"2\" col=\"11\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"L2\" row=\"2\" col=\"12\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"M2\" row=\"2\" col=\"13\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"N2\" row=\"2\" col=\"14\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"O2\" row=\"2\" col=\"15\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"A3\" row=\"3\" col=\"1\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"B3\" row=\"3\" col=\"2\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"C3\" row=\"3\" col=\"3\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"D3\" row=\"3\" col=\"4\"><cell-style font-size=\"10\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"E3\" row=\"3\" col=\"5\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"F3\" row=\"3\" col=\"6\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"G3\" row=\"3\" col=\"7\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"H3\" row=\"3\" col=\"8\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"I3\" row=\"3\" col=\"9\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"J3\" row=\"3\" col=\"10\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"K3\" row=\"3\" col=\"11\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"L3\" row=\"3\" col=\"12\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"M3\" row=\"3\" col=\"13\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"N3\" row=\"3\" col=\"14\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><cell expand=\"None\" name=\"O3\" row=\"3\" col=\"15\"><cell-style font-size=\"9\" forecolor=\"0,0,0\" font-family=\"ÂÆã‰Ωì\" align=\"center\" valign=\"middle\"></cell-style><simple-value><![CDATA[]]></simple-value></cell><row row-number=\"1\" height=\"18\"/><row row-number=\"2\" height=\"18\"/><row row-number=\"3\" height=\"18\"/><column col-number=\"1\" width=\"80\"/><column col-number=\"2\" width=\"80\"/><column col-number=\"3\" width=\"80\"/><column col-number=\"4\" width=\"80\"/><column col-number=\"5\" width=\"74\"/><column col-number=\"6\" width=\"74\"/><column col-number=\"7\" width=\"74\"/><column col-number=\"8\" width=\"74\"/><column col-number=\"9\" width=\"74\"/><column col-number=\"10\" width=\"74\"/><column col-number=\"11\" width=\"74\"/><column col-number=\"12\" width=\"74\"/><column col-number=\"13\" width=\"74\"/><column col-number=\"14\" width=\"74\"/><column col-number=\"15\" width=\"74\"/><datasource name=\"test\" type=\"jdbc\" username=\"\" password=\"\" url=\"Êï∞ÊçÆÊ∫ê/ingrid?useUnicode=true&amp;characterEncoding=utf8&amp;allowMultiQueries=true\" driver=\"com.mysql.jdbc.Driver\"><dataset name=\"test1\" type=\"sql\"><sql><![CDATA[select * from ingrid_method]]></sql><field name=\"methodId\"/><field name=\"methodName\"/><field name=\"poolName\"/><field name=\"outParam\"/><field name=\"sqlType\"/><field name=\"rsStatus\"/></dataset></datasource><datasource name=\"Á≥ªÁªüÊï∞ÊçÆÊ∫ê\" type=\"buildin\"></datasource><paper type=\"A4\" left-margin=\"90\" right-margin=\"90\"\n    top-margin=\"72\" bottom-margin=\"72\" paging-mode=\"fitpage\" fixrows=\"0\"\n    width=\"595\" height=\"842\" orientation=\"portrait\" html-report-align=\"left\" bg-image=\"\" html-interval-refresh-value=\"0\" column-enabled=\"false\"></paper><search-form form-position=\"up\"><grid show-border=\"false\" type=\"Grid3x3x3\" border-width=\"1\" border-color=\"#cccccc\"><col size=\"4\"><input-text label=\"ËæìÂÖ•Ê°Ü1\" type=\"Text\" label-position=\"top\" bind-parameter=\"\"/></col><col size=\"4\"><input-text label=\"ËæìÂÖ•Ê°Ü2\" type=\"Text\" label-position=\"top\" bind-parameter=\"\"/></col><col size=\"4\"><input-text label=\"ÊµãËØï3\" type=\"Text\" label-position=\"top\" bind-parameter=\"\"/></col></grid><grid show-border=\"false\" type=\"Grid2X2\" border-width=\"1\" border-color=\"#eee\"><col size=\"6\"><button-submit label=\"Êèê‰∫§2\" align=\"left\" type=\"Submit-button\" style=\"btn-default\"/></col><col size=\"6\"><button-reset label=\"ÈáçÁΩÆ2\" align=\"left\" type=\"Reset-button\" style=\"btn-default\"/></col></grid></search-form></ureport>','2018-12-28 10:22:54','2018-12-28 10:22:27');

/*Table structure for table `ingrid_user` */

DROP TABLE IF EXISTS `ingrid_user`;

CREATE TABLE `ingrid_user` (
  `userId` int(11) NOT NULL auto_increment COMMENT 'Áî®Êà∑ID',
  `userName` varchar(32) collate utf8_bin default NULL COMMENT 'Áî®Êà∑Âêç',
  `password` varchar(32) collate utf8_bin default NULL COMMENT 'ÂØÜÁ†Å',
  `createTime` datetime default NULL COMMENT 'ÂàõÂª∫Êó∂Èó¥',
  PRIMARY KEY  (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `ingrid_user` */

/*Table structure for table `sss` */

DROP TABLE IF EXISTS `sss`;

CREATE TABLE `sss` (
  `a` int(11) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `sss` */

/*Table structure for table `tablename1` */

DROP TABLE IF EXISTS `tablename1`;

CREATE TABLE `tablename1` (
  `id` bigint(20) default NULL,
  `name` varchar(100) collate utf8_unicode_ci default NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `tablename1` */

insert  into `tablename1`(`id`,`name`) values (1,'aa');

/*Table structure for table `test2` */

DROP TABLE IF EXISTS `test2`;

CREATE TABLE `test2` (
  `ina` int(11) NOT NULL,
  `chaojsyr14` varchar(32) collate utf8_bin default NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `test2` */

/*Table structure for table `test3` */

DROP TABLE IF EXISTS `test3`;

CREATE TABLE `test3` (
  `inagggggg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `test3` */

/*Table structure for table `test4` */

DROP TABLE IF EXISTS `test4`;

CREATE TABLE `test4` (
  `ina` int(11) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `test4` */

/*Table structure for table `test5` */

DROP TABLE IF EXISTS `test5`;

CREATE TABLE `test5` (
  `ina` int(11) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `test5` */

/* Procedure structure for procedure `WeixinSend` */

/*!50003 DROP PROCEDURE IF EXISTS  `WeixinSend` */;

DELIMITER $$

/*!50003 CREATE DEFINER=``@`%` PROCEDURE `WeixinSend`(
	in messageId bigint,
	in weixinId int,
	in signature varchar(256),
	in timestamp  VARCHAR(256),
	in nonce VARCHAR(256),
	IN openId VARCHAR(256),
	IN msgSignature VARCHAR(256),
	IN encryptType VARCHAR(256),
	IN toUserName VARCHAR(256),
	IN fromUserName VARCHAR(256),
	IN msgType VARCHAR(256),
	IN content VARCHAR(256),
	IN msgId bigint,
	IN createTime datetime,
	IN mediaId VARCHAR(256),
	IN picUrl VARCHAR(256),
	IN thumbMediaId VARCHAR(256),
	inout aaa varchar(22),
	out ccc varchar(33)
    
    )
BEGIN
	select openId,"Â∑≤Êü•Êî∂" as content;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `WeixinSend1` */

/*!50003 DROP PROCEDURE IF EXISTS  `WeixinSend1` */;

DELIMITER $$

/*!50003 CREATE DEFINER=``@`%` PROCEDURE `WeixinSend1`(
	in messageId bigint,
	in weixinId int,
	in signature varchar(256),
	in timestamp  VARCHAR(256),
	in nonce VARCHAR(256),
	IN openId VARCHAR(256),
	IN msgSignature VARCHAR(256),
	IN encryptType VARCHAR(256),
	IN toUserName VARCHAR(256),
	IN fromUserName VARCHAR(256),
	IN msgType VARCHAR(256),
	IN content VARCHAR(256),
	IN msgId bigint,
	IN createTime datetime,
	IN mediaId VARCHAR(256),
	IN picUrl VARCHAR(256),
	IN thumbMediaId VARCHAR(256),
	inout aaa varchar(22),
	out ccc varchar(33)
    
    )
BEGIN
	select openId,"Â∑≤Êü•Êî∂" as content;
    END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
