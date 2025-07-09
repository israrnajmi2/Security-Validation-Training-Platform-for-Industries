package com.ss.repository.usermanagement;

import com.ss.domain.usermanagement.ObjectTypeTable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ObjectTypeTableRepository extends JpaRepository<ObjectTypeTable, Integer> {

    List<ObjectTypeTable> findByIsArchivedFalse();
}
