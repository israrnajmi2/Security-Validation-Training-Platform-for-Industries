package com.ss.repository.usermanagement;

import com.ss.domain.usermanagement.OrganizationalUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrganizationalUnitRepository extends JpaRepository<OrganizationalUnit, Integer> {
    List<OrganizationalUnit> findByIsArchivedFalse();

    List<OrganizationalUnit> findByLevelAndIsArchivedFalse(Integer level);

    List<OrganizationalUnit> findByNameAndIsArchivedFalse(String name);

    @Query("SELECT max(at.level) FROM OrganizationalUnit at WHERE isArchived = false")
    Integer getMaxLevel();
}
