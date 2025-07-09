package com.ss.repository.shieldclassification;

import com.ss.domain.shieldclassification.ShieldElement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

import java.util.List;

public interface ShieldElementRepository extends JpaRepository<ShieldElement, Integer> {

    List<ShieldElement> findByNameAndShieldIdAndIsArchivedFalse(String name, Integer shieldId);

    List<ShieldElement> findByShieldIdAndParentShieldElementIdAndIsArchivedFalse(Integer shieldId, Integer parentShieldElementId);

    List<ShieldElement> findByShieldId(Integer shieldId);

    List<ShieldElement> findByAbbreviationAndShieldIdAndIsArchivedFalse(String abbreviation, Integer shieldId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE ShieldElement se SET se.sortOrder=se.sortOrder-1 WHERE se.sortOrder>?1 and se.sortOrder <?2")
    int decrementSortOrderGtLt(int gt, int lt);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE ShieldElement se SET se.sortOrder=se.sortOrder+1 WHERE se.sortOrder>?1 and se.sortOrder <?2")
    int incrementSortOrderGtLt(int gt, int lt);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE ShieldElement se SET se.sortOrder=se.id WHERE se.sortOrder IS NULL")
    int fixSortOrderNullValues();
}
