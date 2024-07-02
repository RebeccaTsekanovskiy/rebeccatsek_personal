library(tidyverse)
info <- read.csv("Info_Data.csv")
do_temp <- read.csv("Interpolated_Data.csv")
head(do_temp)
length(do_temp$row_id)
lg_tempdo <- filter(do_temp, lake_id==131)
str(lg_tempdo)
do_temp$date <- as.Date(do_temp$date)
str(do_temp)
lg_surf_tempdo <- filter(lg_tempdo, depth <= 5)
lg_surf_mean <- lg_surf_tempdo %>% group_by(date) %>%
  summarise(surf_temp = mean(temp),
            surf_do = mean(do_con))
library(lubridate)
lg_surf_mean$month <-month(lg_surf_mean$date)
lg_surf_mean_summ <- filter(lg_surf_mean, month == 7 | month ==8)
lg_surf_mean_summ$year <- year(lg_surf_mean_summ$date)

lg_surf_mean_summ$n <- 1

lg_annual_tempdo <- lg_surf_mean_summ %>% group_by(year) %>%
  summarise(surf_temp = mean(surf_temp),
            surf_do_con = mean(surf_do),
            n = sum(n))

head(lg_annual_tempdo)

ggplot(data = lg_annual_tempdo, aes(x = year, y = surf_temp))+
  geom_point()+
  theme_dark()+
  ylab("surface Temperature")
st_lm <- lm(lg_annual_tempdo$surf_temp ~ lg_annual_tempdo$year)
summary(st_lm)

ggplot(data = lg_annual_tempdo, aes(x = year, y = surf_temp))+
  geom_point()+
  theme_dark()+
  geom_smooth()+
  ylab("surface Temperature")

ggplot(data = lg_annual_tempdo, aes(x = year, y = surf_do_con))+
  geom_point()+
  ylab("dissolved oxygen concentration (mg/L)")
  
sdo_lm <- lm(lg_annual_tempdo$surf_do_con ~ lg_annual_tempdo$year)
summary(sdo_lm)


ggplot(data = lg_annual_tempdo, aes(x = year, y = surf_do_con))+
  geom_point()+
  geom_smooth()+
  theme_dark()+
  ylab("dissolved oxygen concentration (mg/L)")
       
       

