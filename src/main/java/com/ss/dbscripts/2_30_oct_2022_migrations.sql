ALTER TABLE `genome`.`shield_type`
ADD COLUMN `default_shield_fk` INT(11) NULL DEFAULT NULL AFTER `id`,
ADD INDEX `shield_type_default_shield_fk_idx` (`default_shield_fk` ASC);

ALTER TABLE `genome`.`shield_type`
ADD CONSTRAINT `shield_type_default_shield_fk`
  FOREIGN KEY (`default_shield_fk`)
  REFERENCES `genome`.`shield` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


CREATE TABLE `genome`.`link_to_prefs` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `shield_id_one` INT(11) NULL,
  `object_type_one` VARCHAR(255) NOT NULL,
  `shield_id_two` INT(11) NULL,
  `object_type_two` VARCHAR(255) NOT NULL,
  `create_dt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `link_to_prefs_shield_id_one` (`shield_id_one` ASC),
  INDEX `link_to_prefs_object_type_one` (`object_type_one` ASC),
  INDEX `link_to_prefs_shield_id_two` (`shield_id_two` ASC),
  INDEX `link_to_prefs_object_type_two` (`object_type_two` ASC));

ALTER TABLE `genome`.`link_to_prefs`
ADD COLUMN `is_direct_mode` BIT(1) NOT NULL DEFAULT 1 AFTER `object_type_two`;


