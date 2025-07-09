package com.ss.repository.shieldclassification;

import com.ss.domain.shieldclassification.ShieldElementToShieldElementMap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShieldElementToShieldElementMapRepository extends JpaRepository<ShieldElementToShieldElementMap, Integer> {

    List<ShieldElementToShieldElementMap> findByShieldElementOneIdAndShieldElementTwoShieldId(Integer shieldElementOneId, Integer shieldElementTwoShieldId);

    List<ShieldElementToShieldElementMap> findByShieldElementTwoIdAndShieldElementOneShieldId(Integer shieldElementTwoId, Integer shieldElementOneShieldId);

    List<ShieldElementToShieldElementMap> findByShieldElementOneId(Integer shieldElementOneId);

    List<ShieldElementToShieldElementMap> findByShieldElementTwoId(Integer shieldElementTwoId);

    List<ShieldElementToShieldElementMap> findByShieldElementOneIdAndShieldElementTwoId(Integer shieldElementOneId, Integer shieldElementTwoId);

    List<ShieldElementToShieldElementMap> findByShieldElementOneShieldIdAndShieldElementTwoShieldIdAndIsArchivedFalse(Integer shieldOneId, Integer shieldTwoId);

}
