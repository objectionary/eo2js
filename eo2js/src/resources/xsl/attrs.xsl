<?xml version="1.0" encoding="UTF-8"?>
<!--
 * SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
 * SPDX-License-Identifier: MIT
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" id="attrs" version="2.0">
  <!--
  Add <attr> elements to attributes of the <class>
  -->
  <xsl:output encoding="UTF-8" method="xml"/>
  <xsl:template match="object/o[@name and not(@level)]">
    <xsl:element name="attr">
      <xsl:apply-templates select="@name"/>
      <xsl:variable name="t">
        <xsl:choose>
          <!-- EO 0.59.0 uses base="∅" for void attributes -->
          <xsl:when test="@base and @base != '∅'">
            <xsl:text>bound</xsl:text>
          </xsl:when>
          <xsl:otherwise>
            <xsl:text>void</xsl:text>
          </xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <xsl:element name="{$t}">
        <xsl:copy>
          <xsl:apply-templates select="node()|@*"/>
        </xsl:copy>
      </xsl:element>
    </xsl:element>
  </xsl:template>
  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>
</xsl:stylesheet>
