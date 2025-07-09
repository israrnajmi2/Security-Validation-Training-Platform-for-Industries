ALTER TABLE `shield_element_group`
ADD COLUMN `shield_fk` INT(11) NULL DEFAULT NULL AFTER `description`,
ADD INDEX `fk_shield_element_group_shield_fk_idx` (`shield_fk` ASC);

ALTER TABLE `shield_element_group`
ADD CONSTRAINT `fk_shield_element_group_shield_fk`
  FOREIGN KEY (`shield_fk`)
  REFERENCES `shield` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

UPDATE shield_element_group  seg
SET seg.shield_fk = (
    SELECT setype.shield_fk
    FROM shield_element_type setype
    WHERE seg.shield_element_type_fk = setype.id
) WHERE id > 0;