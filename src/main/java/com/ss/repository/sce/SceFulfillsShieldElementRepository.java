package com.ss.repository.sce;

import com.ss.domain.sce.SceFulfillsShieldElement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SceFulfillsShieldElementRepository extends JpaRepository<SceFulfillsShieldElement, Integer> {

    List<SceFulfillsShieldElement> findBySceIdAndShieldElementShieldId(Integer expressionId, Integer shieldId);

}
