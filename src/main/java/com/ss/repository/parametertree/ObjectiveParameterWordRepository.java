package com.ss.repository.parametertree;

import com.ss.domain.parametertree.ObjectiveParameterWord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ObjectiveParameterWordRepository extends JpaRepository<ObjectiveParameterWord, Integer> {
    List<ObjectiveParameterWord> findByLevelAndIsArchivedFalse(Integer level);

    List<ObjectiveParameterWord> findByWordAndIsArchivedFalse(String name);

    @Query("SELECT max(at.level) FROM ObjectiveParameterWord at WHERE isArchived = false")
    Integer getMaxLevel();
}
