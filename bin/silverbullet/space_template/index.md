你好 👋！

欢迎来到 SilverBullet 的精彩世界。这里是一个一旦发现并喜欢上，就很难再离开的地方。

_我们都是其中一员！_

如果你不确定从哪里开始，可以先阅读 [使用手册](https://silverbullet.md/Manual)，或更具体地查看 [快速入门](https://silverbullet.md/Getting%20Started)。如有问题，欢迎前往 [社区论坛](https://community.silverbullet.md/) 交流。

此页面只是为了让你的空间不必从一张白纸开始。你可以随时删除它，或按自己的需求进行调整。这个空间完全属于你，尽情打造它吧。

# 最近的快速笔记
${widgets.commandButton("新建快速笔记", "Quick Note")}

${some(query[[
  from p = index.subPages("Inbox")
  order by p.lastModified desc
  limit 10 select templates.fullPageItem(p)
]]) or "_暂时没有快速笔记。_"}

# 最近的日记条目
${widgets.commandButton("今天的日记", "Journal: Today")}

${some(query[[
  from j = index.pages(config.get("journal.tag"))
  where j.tag == "page"
  order by j.date desc
  limit 14
  select templates.pageItem(j)
]]) or "_暂时没有日记条目。_"}

# 最近未完成的任务
${some(query[[
  from t = index.tasks()
  where not t.done
  order by t.pageLastModified
  desc limit 10
  select templates.taskItem(t)
]]) or "_所有任务均已完成！_"}

# 最近修改的页面
${query[[
  from p = index.contentPages()
  order by p.lastModified desc
  limit 10
  select templates.fullPageItem(p) 
]]}
