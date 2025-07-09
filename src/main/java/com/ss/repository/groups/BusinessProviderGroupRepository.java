package com.ss.repository.groups;

import com.ss.domain.groups.BusinessProviderGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessProviderGroupRepository extends JpaRepository<BusinessProviderGroup, Integer> {

    List<BusinessProviderGroup> findByIsArchivedFalse();
}
