package com.ss.repository.asset;

import com.ss.domain.asset.AssetTypeToShieldElementMap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetTypeToShieldElementMapRepository extends JpaRepository<AssetTypeToShieldElementMap, Integer> {

    List<AssetTypeToShieldElementMap> findByAssetTypeIdAndShieldElementShieldId(Integer assetTypeId, Integer shieldId);
}
