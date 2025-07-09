package com.ss.repository.businessasset;

import com.ss.domain.businessasset.BusinessAssetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface BusinessAssetTypeRepository extends JpaRepository<BusinessAssetType, Integer> {

    List<BusinessAssetType> findByLevelAndIsArchivedFalse(Integer level);

    List<BusinessAssetType> findByNameAndIsArchivedFalse(String name);

    @Query("SELECT max(at.level) FROM BusinessAssetType at WHERE isArchived = false")
    Integer getMaxLevel();

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE BusinessAssetType se SET se.sortOrder=se.sortOrder-1 WHERE se.sortOrder>?1 and se.sortOrder <?2")
    int decrementSortOrderGtLt(int gt, int lt);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE BusinessAssetType se SET se.sortOrder=se.sortOrder+1 WHERE se.sortOrder>?1 and se.sortOrder <?2")
    int incrementSortOrderGtLt(int gt, int lt);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE BusinessAssetType se SET se.sortOrder=se.id WHERE se.sortOrder IS NULL")
    int fixSortOrderNullValues();
}
