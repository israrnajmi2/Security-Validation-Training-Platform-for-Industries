package com.ss.repository.asset;

import com.ss.domain.asset.AssetDeliversSce;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetDeliversSceRepository extends JpaRepository<AssetDeliversSce, Integer> {

    List<AssetDeliversSce> findByIsArchivedFalse();

}
