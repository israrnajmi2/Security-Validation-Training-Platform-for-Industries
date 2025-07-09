package com.ss.repository.shieldclassification;


import com.ss.domain.shieldclassification.Shield;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShieldRepository extends JpaRepository<Shield, Integer> {
    List<Shield> findByNameAndIsArchivedFalse(String name);

    List<Shield> findByNameAndShieldTypeIdAndIsArchivedFalse(String name, Integer shieldTypeId);

    List<Shield> findByIsArchivedFalse();
}
