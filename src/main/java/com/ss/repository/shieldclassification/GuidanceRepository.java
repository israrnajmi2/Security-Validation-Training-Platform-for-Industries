package com.ss.repository.shieldclassification;


import com.ss.domain.shieldclassification.Guidance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GuidanceRepository extends JpaRepository<Guidance, Integer> {

    List<Guidance> findByShieldElementIdAndIsArchivedFalse(Integer shieldElementId);
}
