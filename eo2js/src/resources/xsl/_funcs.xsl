<?xml version="1.0" encoding="UTF-8"?>
<!--
 * SPDX-FileCopyrightText: Copyright (c) 2024 Objectionary.com
 * SPDX-License-Identifier: MIT
-->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:eo="https://www.eolang.org" xmlns:xs="http://www.w3.org/2001/XMLSchema" id="_funcs" version="2.0">
  <xsl:function name="eo:has-data" as="xs:boolean">
    <xsl:param name="o" as="element()"/>
    <xsl:sequence select="normalize-space(string-join($o/text(), '')) != ''"/>
  </xsl:function>
  <!-- Check if element is a test attribute (name starts with +) -->
  <xsl:function name="eo:test-attr" as="xs:boolean">
    <xsl:param name="o" as="element()"/>
    <xsl:sequence select="starts-with($o/@name, '+')"/>
  </xsl:function>
  <!-- Remove the + prefix from test attribute name -->
  <xsl:function name="eo:escape-plus" as="xs:string">
    <xsl:param name="name" as="xs:string"/>
    <xsl:sequence select="if (starts-with($name, '+')) then substring($name, 2) else $name"/>
  </xsl:function>
</xsl:stylesheet>
