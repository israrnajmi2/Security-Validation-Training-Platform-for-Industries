package com.ss.repository.groups;

import com.ss.domain.groups.AssetGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetGroupRepository extends JpaRepository<AssetGroup, Integer> {

    List<AssetGroup> findByIsArchivedFalse();

}
