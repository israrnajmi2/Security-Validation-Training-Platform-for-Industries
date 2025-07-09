package com.ss.repository.groups;

import com.ss.domain.groups.SceGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SceGroupRepository extends JpaRepository<SceGroup, Integer> {

    List<SceGroup> findByIsArchivedFalse();

}