package com.ss.repository.groups;

import com.ss.domain.groups.ProviderGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProviderGroupRepository extends JpaRepository<ProviderGroup, Integer> {

    List<ProviderGroup> findByIsArchivedFalse();
}
