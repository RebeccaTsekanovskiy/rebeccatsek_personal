install.packages("tidyverse")
library(tidyverse)
dat <-read.csv("rotifer.txt")
dat <-read.csv("rotifer.txt", header=TRUE, sep="\t")
class(dat)
# $ -> column name
dat$lake.name
class(dat$lake.name)
class(dat$sum_mg_ww_L)
head(dat)
str(dat)
dat$round <-round(dat$sum_mg_ww_L, digits=2)
head(dat)
summary(dat$round)
class(dat$round)
class(dat$lake.name)
avg <-mean(dat$round)
max <-max(dat$round)
max
min <-min(dat$round)
min
dat$away_from_avg <-dat$round -avg
options(scipen = 999)
all_avg <-dat%>%group_by(lake.name)%>%summarise(avg=mean(round))
ann_avg <-dat%>%group_by(lake.name,Year)%>%summarise(avg=mean(round),stdev=sd(round))
bgm <-filter(dat, lake.name=="Big Moose")
two_lakes <-filter(dat, lake.name=="Big Moose" | lake.name=="G")
large <-filter(two_lakes,round>2)
small <-filter(two_lakes, round <=2)
write.csv(ann_avg,"annual_average_per_lake.csv",row.names = FALSE)
library(ggplot2)
head(bgm)
ggplot(data=bgm,aes(x=Year, y=round))+
  geom_point()
head(ann_avg)
ggplot(data=ann_avg,aes(x=Year, y=avg))+  
  geom_point()+
  facet_wrap(~lake.name)
ggplot(data=ann_avg,aes(x=Year,y=avg))+
  geom_point(color="blue")+
  facet_wrap(~lake.name)+
  ylab("Animal Density(mg/L")+
  xlab("")+
  theme_classic()
ggplot(data=bgm,aes(x=Year,y=round))+
  geom_point()+
  geom_smooth(method="lm",se= FALSE, color="red",linetype="dashed")+
  theme_classic()+
  ylab("Crustcean Density(mg ww/L)")+
  xlab("")
ggsave("scatter_2.jpeg")
head(two_lakes)
last_years <-filter(two_lakes,Year>=2010)
head(last_years)
mean_2_lakes <-last_years%>%group_by(lake.name)%>%summarise(mean=mean(round),sd=sd(round))
head(mean_2_lakes)
ggplot(data=mean_2_lakes,aes(x=lake.name,y=mean,fill=lake.name))+
  geom_bar(stat="identity")+
  theme_dark()+
  xlab("Lakes")+
  ylab("Average crustacean values")+
  
  scale_fill_manual(values=c('white','orange'))
ggsave("bar2.jpeg")

