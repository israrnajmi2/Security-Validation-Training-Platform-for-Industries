package com.ss.repository.perspective.attribute;

import com.ss.domain.perspective.attribute.AssetImplementsElementRTLibraryAttribute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetImplementsElementRTLibraryAttributeRepository extends JpaRepository<AssetImplementsElementRTLibraryAttribute, Integer> {
    List<AssetImplementsElementRTLibraryAttribute> findByCustomPerspectiveIdAndIsArchivedFalse(Integer perspectiveId);
}
