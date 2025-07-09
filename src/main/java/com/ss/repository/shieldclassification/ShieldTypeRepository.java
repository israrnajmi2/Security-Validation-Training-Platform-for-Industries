package com.ss.repository.shieldclassification;


import com.ss.domain.shieldclassification.ShieldType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShieldTypeRepository extends JpaRepository<ShieldType, Integer> {
    List<ShieldType> findByIsArchivedFalse();

    List<ShieldType> findByNameAndIsArchivedFalse(String name);
}
