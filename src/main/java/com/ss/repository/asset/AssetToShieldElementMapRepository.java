package com.ss.repository.asset;

import com.ss.domain.asset.AssetToShieldElementMap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetToShieldElementMapRepository extends JpaRepository<AssetToShieldElementMap, Integer> {

    List<AssetToShieldElementMap> findByAssetIdAndShieldElementShieldIdAndIsArchivedFalse(Integer assetId, Integer shieldId);

    List<AssetToShieldElementMap> findByIsArchivedFalse();

}
