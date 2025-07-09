package com.ss.repository.groups;

import com.ss.domain.groups.ShieldElementGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShieldElementGroupRepository extends JpaRepository<ShieldElementGroup, Integer> {

    List<ShieldElementGroup> findByShieldElementTypeIdAndIsArchivedFalse(Integer elementTypeId);

    List<ShieldElementGroup> findByLevelAndShieldIdAndShieldElementTypeIdAndIsArchivedFalse(Integer level, Integer shieldId, Integer elementTypeId );

}
