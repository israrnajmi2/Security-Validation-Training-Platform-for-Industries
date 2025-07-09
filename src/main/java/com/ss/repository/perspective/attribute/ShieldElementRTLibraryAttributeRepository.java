package com.ss.repository.perspective.attribute;

import com.ss.domain.perspective.attribute.ShieldElementRTLibraryAttribute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShieldElementRTLibraryAttributeRepository extends JpaRepository<ShieldElementRTLibraryAttribute, Integer> {

    //List<ShieldElementRTLibraryAttribute> findByCustomPerspectiveIdAnAndShieldElementTypeIdAndIsArchivedFalse(Integer perspectiveId, Integer shieldElementTypeId);
    List<ShieldElementRTLibraryAttribute> findByCustomPerspectiveIdAndShieldElementTypeIdAndIsArchivedFalse(Integer perspectiveId, Integer shieldElementTypeId);
}
