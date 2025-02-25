<?xml version="1.0" encoding="UTF-8"?>
<!--
 * SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
 * SPDX-License-Identifier: MIT
-->
<xsl:stylesheet xmlns:eo="https://www.eolang.org" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" id="data" version="2.0">
  <!-- Prepare bytes -->
  <xsl:import href="_funcs.xsl"/>
  <xsl:output encoding="UTF-8" method="xml"/>
  <xsl:template match="o[eo:has-data(.)]">
    <xsl:copy>
      <xsl:apply-templates select="@*"/>
      <xsl:attribute name="primitive"/>
      <xsl:element name="value">
        <xsl:text>[</xsl:text>
        <xsl:for-each select="tokenize(text(), '-')">
          <xsl:if test=".!=''">
            <xsl:if test="position() &gt; 1">
              <xsl:text>, </xsl:text>
            </xsl:if>
            <xsl:text>'0x</xsl:text>
            <xsl:value-of select="."/>
            <xsl:text>'</xsl:text>
          </xsl:if>
        </xsl:for-each>
        <xsl:text>]</xsl:text>
      </xsl:element>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>
</xsl:stylesheet>
