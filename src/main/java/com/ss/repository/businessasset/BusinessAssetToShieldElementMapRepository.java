package com.ss.repository.businessasset;

import com.ss.domain.businessasset.BusinessAssetToShieldElementMap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessAssetToShieldElementMapRepository extends JpaRepository<BusinessAssetToShieldElementMap, Integer> {

    List<BusinessAssetToShieldElementMap> findByBusinessAssetIdAndShieldElementShieldId(Integer businessAssetId, Integer shieldId);

}
