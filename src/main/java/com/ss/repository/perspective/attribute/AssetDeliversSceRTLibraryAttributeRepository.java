package com.ss.repository.perspective.attribute;

import com.ss.domain.perspective.attribute.AssetDeliversSceRTLibraryAttribute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetDeliversSceRTLibraryAttributeRepository extends JpaRepository<AssetDeliversSceRTLibraryAttribute, Integer> {
    List<AssetDeliversSceRTLibraryAttribute> findByCustomPerspectiveIdAndIsArchivedFalse(Integer perspectiveId);
}
