package com.ss.repository.usermanagement;

import com.ss.domain.usermanagement.MiscellaneousAction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MiscellaneousActionRepository extends JpaRepository<MiscellaneousAction, Integer> {

    List<MiscellaneousAction> findByIsArchivedFalse();
}
