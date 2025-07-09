package com.ss.repository.shieldclassification;

import com.ss.domain.shieldclassification.ShieldElementType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShieldElementTypeRepository extends JpaRepository<ShieldElementType, Integer> {
    List<ShieldElementType> findByIsArchivedFalse();

    List<ShieldElementType> findByNameAndShieldIdAndIsArchivedFalse(String name, Integer shieldId);

    List<ShieldElementType> findByShieldIdAndParentShieldElementTypeId(Integer shieldId, Integer parentShieldElementType);

    List<ShieldElementType> findByShieldIdAndLevelAndIsArchivedFalse(Integer shieldId, Integer level);

    List<ShieldElementType> findByShieldId(Integer shieldId);

    List<ShieldElementType> findByShieldIdAndIsArchivedFalse(Integer shieldId);
}
