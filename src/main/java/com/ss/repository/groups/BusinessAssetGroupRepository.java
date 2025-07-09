package com.ss.repository.groups;

import com.ss.domain.groups.BusinessAssetGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BusinessAssetGroupRepository extends JpaRepository<BusinessAssetGroup, Integer> {

    List<BusinessAssetGroup> findByIsArchivedFalse();

}
