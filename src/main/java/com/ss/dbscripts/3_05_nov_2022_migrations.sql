USE `genome`;
ALTER TABLE `asset`
ADD COLUMN `sort_order` INT(11) NULL AFTER `id`;
UPDATE `asset` SET `sort_order`= `id` WHERE `id` > 0;

USE `genome`;
ALTER TABLE `business_asset`
ADD COLUMN `sort_order` INT(11) NULL AFTER `id`;
UPDATE `business_asset` SET `sort_order`= `id` WHERE `id` > 0;

USE `genome`;
ALTER TABLE `asset_type`
ADD COLUMN `sort_order` INT(11) NULL AFTER `id`;
UPDATE `asset_type` SET `sort_order`= `id` WHERE `id` > 0;

USE `genome`;
ALTER TABLE `business_asset_type`
ADD COLUMN `sort_order` INT(11) NULL AFTER `id`;
UPDATE `business_asset_type` SET `sort_order`= `id` WHERE `id` > 0;

USE `genome`;
ALTER TABLE `provider_info`
ADD COLUMN `sort_order` INT(11) NULL AFTER `id`;
UPDATE `provider_info` SET `sort_order`= `id` WHERE `id` > 0;

USE `genome`;
ALTER TABLE `business_provider`
ADD COLUMN `sort_order` INT(11) NULL AFTER `id`;
UPDATE `business_provider` SET `sort_order`= `id` WHERE `id` > 0;
