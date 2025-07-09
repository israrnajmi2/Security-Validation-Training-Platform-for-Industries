package com.ss.repository.businessasset;

import com.ss.domain.businessasset.BusinessAssetTypeToShieldElementMap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessAssetTypeToShieldElementMapRepository extends JpaRepository<BusinessAssetTypeToShieldElementMap, Integer> {

    List<BusinessAssetTypeToShieldElementMap> findByBusinessAssetTypeIdAndShieldElementShieldId(Integer businessAssetTypeId, Integer shieldId);
}
