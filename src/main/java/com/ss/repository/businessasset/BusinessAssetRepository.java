package com.ss.repository.businessasset;

import com.ss.domain.businessasset.BusinessAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface BusinessAssetRepository extends JpaRepository<BusinessAsset, Integer> {

    List<BusinessAsset> findByIsArchivedFalse();

    List<BusinessAsset> findByNameAndIsArchivedFalse(String name);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE BusinessAsset se SET se.sortOrder=se.sortOrder-1 WHERE se.sortOrder>?1 and se.sortOrder <?2")
    int decrementSortOrderGtLt(int gt, int lt);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE BusinessAsset se SET se.sortOrder=se.sortOrder+1 WHERE se.sortOrder>?1 and se.sortOrder <?2")
    int incrementSortOrderGtLt(int gt, int lt);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE BusinessAsset se SET se.sortOrder=se.id WHERE se.sortOrder IS NULL")
    int fixSortOrderNullValues();
}
