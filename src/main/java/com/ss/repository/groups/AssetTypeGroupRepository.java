package com.ss.repository.groups;

import com.ss.domain.groups.AssetTypeGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetTypeGroupRepository extends JpaRepository<AssetTypeGroup, Integer> {

    List<AssetTypeGroup> findByLevelAndIsArchivedFalse(Integer level);

}
