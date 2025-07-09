package com.ss.repository.shieldclassification;


import com.ss.domain.shieldclassification.TestProcedure;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestProcedureRepository extends JpaRepository<TestProcedure, Integer> {

    List<TestProcedure> findByShieldElementIdAndIsArchivedFalse(Integer shieldElementId);
}
