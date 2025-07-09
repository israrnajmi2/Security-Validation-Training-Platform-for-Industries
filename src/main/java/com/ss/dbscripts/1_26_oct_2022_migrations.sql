USE `genome`;
ALTER TABLE `shield_element`
ADD COLUMN `sort_order` INT(11) NULL AFTER `id`;
UPDATE `shield_element` SET `sort_order`= `id` WHERE `id` > 0;