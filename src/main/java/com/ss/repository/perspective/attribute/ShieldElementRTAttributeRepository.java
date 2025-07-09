package com.ss.repository.perspective.attribute;

import com.ss.domain.perspective.attribute.ShieldElementRTAttribute;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShieldElementRTAttributeRepository extends JpaRepository<ShieldElementRTAttribute, Integer> {

    List<ShieldElementRTAttribute> findByShieldElementTypeIdAndCustomPerspectiveId(Integer shieldElementTypeId, Integer perspectiveId);

}
