package com.ss.repository.asset;

import com.ss.domain.asset.ProviderInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface ProviderInfoRepository extends JpaRepository<ProviderInfo, Integer> {

    List<ProviderInfo> findByIsArchivedFalse();

    List<ProviderInfo> findByNameAndIsArchivedFalse(String name);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE ProviderInfo se SET se.sortOrder=se.sortOrder-1 WHERE se.sortOrder>?1 and se.sortOrder <?2")
    int decrementSortOrderGtLt(int gt, int lt);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE ProviderInfo se SET se.sortOrder=se.sortOrder+1 WHERE se.sortOrder>?1 and se.sortOrder <?2")
    int incrementSortOrderGtLt(int gt, int lt);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE ProviderInfo se SET se.sortOrder=se.id WHERE se.sortOrder IS NULL")
    int fixSortOrderNullValues();
}
