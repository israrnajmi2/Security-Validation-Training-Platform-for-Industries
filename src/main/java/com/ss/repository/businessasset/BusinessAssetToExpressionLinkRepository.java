package com.ss.repository.businessasset;

import com.ss.domain.businessasset.BusinessAssetToExpressionLink;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessAssetToExpressionLinkRepository extends JpaRepository<BusinessAssetToExpressionLink, Integer> {

    List<BusinessAssetToExpressionLink> findByIsArchivedFalse();

}
