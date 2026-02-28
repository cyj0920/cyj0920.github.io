---
title: Hello World
date: 2023-12-13
categories:
  - 技术
tags:
  - 嵌入式
  - 调试
---

## 调试接口

Access Port 等于 AP 接入端口。

## 嵌入式跟踪组件

- **ETM**: 嵌入式跟踪宏 Embedded Trace Macro
- **TPIU**: 跟踪端口接口单元 Trace Port Interface Unit
- **DWT**: 数据观察点和追踪 Data Watchpoint and Trace
- **FTB**: Flash 补丁和断点 Flash Patch and Breakpoint
- **ITM**: 仪器跟踪宏单元 Instrumentation Trace Macrocell

## 调试器支持

上述的安排显示，需要支持几类调试器：

- **Luaterbach**: JTAG 接口
- **UDE**: JTAG 接口
- **I-JET**: JTAG SWD
- **JLINK**: JTAG SWD
- **CMSIS DAP**: JTAG SWD

## 参考资料

- [ARM Cortex-M上的Trace跟踪方案](https://blog.csdn.net/weixin_48120109/article/details/126167331)
- [英飞凌 AURIX 系列单片机的HSM详解](https://blog.csdn.net/weixin_42967006/article/details/121492113)
