library(ggplot2)
library(dplyr)
dat <- read.csv("Results_19129_area.csv")
class(dat)
head(dat)
str(dat)
dat$round <-round(dat$Area, digits=2)
head(dat)
summary(dat$round)
sd(dat$Area)
ggplot(data=dat,aes(x=Area,color="Red"))+
  geom_histogram()+
  theme_classic()+
  scale_color_identity()+
  stat_bin(bins=5)+
  ylab("Frequency")+
  xlab("Area(Um)")
  

dat2 <- read.csv("Results_19129.csv")
head(dat2)
summary(dat2$Length)
sd(dat2$Length)
ggplot(data=dat2,aes(x=Length,color="Red"))+
  geom_histogram()+
  theme_classic()+
  stat_bin(bins=5)+
  scale_color_identity()+
  ylab("Frequency")+
  xlab("Length(um)")




dat3 <- read.csv("Results_36630_area.csv")
head(dat3)
summary(dat3$Area)
sd(dat3$Area)
ggplot(data=dat3,aes(x=Area,color="Red"))+
  geom_histogram()+
  theme_classic()+
  stat_bin(bins=5)+
  scale_color_identity()+
  ylab("Frequency")+
  xlab("Area(um)")

dat4 <- read.csv("Results_length_36630.csv")
head(dat4)
summary(dat4$Length)
sd(dat4$Length)
ggplot(data=dat4,aes(x=Length,color="Red"))+
  geom_histogram()+
  theme_classic()+
  stat_bin(bins=5)+
  scale_color_identity()+
  ylab("Frequency")+
  xlab("Length(um)")

dat5 <- read.csv("Results_36659_area.csv")
head(dat5)
summary(dat5$Area)
sd(dat5$Area)
ggplot(data=dat5,aes(x=Area,color="Red"))+
  geom_histogram()+
  stat_bin(bins=5)+
  theme_classic()+
  scale_color_identity()+
  ylab("Frequency")+
  xlab("Area(um)")


dat6 <- read.csv("Results_36659_length.csv")
head(dat6)
summary(dat6$Length)
sd(dat6$Length)
ggplot(data=dat6,aes(x=Length,color="Red"))+
  geom_histogram()+
  theme_classic()+
  stat_bin(bins=5)+
  scale_color_identity()+
  ylab("Frequency")+
  xlab("Length(um)")


