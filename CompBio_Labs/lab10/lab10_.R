library(dplyr)
library(ggplot2)
library(tidyverse)

finches <- read.csv("finch_beaks_extended_data.csv")

unique(finches$year)

species1 <-filter(finches, species=="fortis")
species1_1973 <- filter(species1, year==1973)
summary(species1_1973$beak.depth..mm.)
summary(species1_1973$beak.length..mm.)

sd(species1_1973$beak.depth..mm.)
sd(species1_1973$beak.length..mm.)


species1_1975 <- filter(species1, year==1975)
summary(species1_1975$beak.depth..mm.)
summary(species1_1975$beak.length..mm.)
sd(species1_1975$beak.depth..mm.)
sd(species1_1975$beak.length..mm.)

species1_1987 <- filter(species1, year==1987)
summary(species1_1987$beak.depth..mm.)
summary(species1_1987$beak.length..mm.)
sd(species1_1987$beak.depth..mm.)
sd(species1_1987$beak.length..mm.)

species1_1991 <- filter(species1, year==1991)
summary(species1_1991$beak.depth..mm.)
summary(species1_1991$beak.length..mm.)
sd(species1_1991$beak.depth..mm.)
sd(species1_1991$beak.length..mm.)

species1_2012 <- filter(species1, year==2012)
summary(species1_2012$beak.depth..mm.)
summary(species1_2012$beak.length..mm.)
sd(species1_2012$beak.depth..mm.)
sd(species1_2012$beak.length..mm.)

species2 <-filter(finches, species=="scandens")


species2_1973 <- filter(species2, year==1973)
summary(species2_1973$beak.depth..mm.)
summary(species2_1973$beak.length..mm.)
sd(species2_1973$beak.depth..mm.)
sd(species2_1973$beak.length..mm.)

species2_1975 <- filter(species2, year==1975)
summary(species2_1975$beak.depth..mm.)
summary(species2_1975$beak.length..mm.)
sd(species2_1975$beak.depth..mm.)
sd(species2_1975$beak.length..mm.)

species2_1987 <- filter(species2, year==1987)
summary(species2_1987$beak.depth..mm.)
summary(species2_1987$beak.length..mm.)
sd(species2_1987$beak.depth..mm.)
sd(species2_1987$beak.length..mm.)

species2_1991 <- filter(species2, year==1991)
summary(species2_1991$beak.depth..mm.)
summary(species2_1991$beak.length..mm.)
sd(species2_1991$beak.depth..mm.)
sd(species2_1991$beak.length..mm.)


species2_2012 <- filter(species2, year==2012)
summary(species2_2012$beak.depth..mm.)
summary(species2_2012$beak.length..mm.)
sd(species2_2012$beak.depth..mm.)
sd(species2_2012$beak.length..mm.)




