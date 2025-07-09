package com.ss.pojo.helper;

import java.util.List;

public class IngestExceptionsInfo {

    private List<String> lessThanThreeColumnRows;
    private List<String> inValidContentRows;
    private List<String> orphanedRows;

    public List<String> getLessThanThreeColumnRows() {
        return lessThanThreeColumnRows;
    }

    public void setLessThanThreeColumnRows(List<String> lessThanThreeColumnRows) {
        this.lessThanThreeColumnRows = lessThanThreeColumnRows;
    }

    public List<String> getInValidContentRows() {
        return inValidContentRows;
    }

    public void setInValidContentRows(List<String> inValidContentRows) {
        this.inValidContentRows = inValidContentRows;
    }

    public List<String> getOrphanedRows() {
        return orphanedRows;
    }

    public void setOrphanedRows(List<String> orphanedRows) {
        this.orphanedRows = orphanedRows;
    }
}
