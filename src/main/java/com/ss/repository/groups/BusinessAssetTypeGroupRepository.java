package com.ss.repository.groups;

import com.ss.domain.groups.BusinessAssetTypeGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessAssetTypeGroupRepository extends JpaRepository<BusinessAssetTypeGroup, Integer> {

    List<BusinessAssetTypeGroup> findByLevelAndIsArchivedFalse(Integer level);

}
