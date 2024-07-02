library(dplyr)
library(ggplot2)
finches <- read.csv("finches_data_for_lab.csv")





beak_depth <- finches %>% group_by(drought_survival) %>% summarise(beakdepth = mean(beak_depth_mm), sd = sd(beak_depth_mm))

head(beak_depth)
ggplot(data=beak_depth, aes(x = drought_survival, y=beakdepth,fill=drought_survival))+
  geom_bar(stat="identity")+
  geom_errorbar(aes(ymin=beakdepth-sd, ymax=beakdepth+sd), width=.8)+
  theme_dark()+
  scale_fill_manual(values=c('green',"blue"))
  


survival_comparison_beaklength <- finches %>% group_by(drought_survival) %>% summarise(beaklength = mean(beak_length_mm), sd = sd(beak_length_mm))


head(survival_comparison_beaklength)
ggplot(data=survival_comparison_beaklength, aes(x = drought_survival, y=beaklength,fill=drought_survival))+
  geom_bar(stat="identity")+
  geom_errorbar(aes(ymin=beaklength-sd, ymax=beaklength+sd), width=.8)+
  theme_dark()+
  scale_fill_manual(values=c('green',"blue"))





survival_comparison_beakwidth <- finches %>% group_by(drought_survival) %>% summarise(beakwidth = mean(beak_width_mm), sd = sd(beak_width_mm))

head(survival_comparison_beakwidth)
ggplot(data=survival_comparison_beakwidth, aes(x = drought_survival, y=beakwidth,fill=drought_survival))+
  geom_bar(stat="identity")+
  geom_errorbar(aes(ymin=beakwidth-sd, ymax=beakwidth+sd), width=.8)+
  theme_dark()+
  scale_fill_manual(values=c('green',"blue"))



survival_comparison_winglength <- finches %>% group_by(drought_survival) %>% summarise(winglength = mean(wing_length_mm), sd = sd(wing_length_mm))

head(survival_comparison_winglength)
ggplot(data=survival_comparison_winglength, aes(x = drought_survival, y=winglength,fill=drought_survival))+
  geom_bar(stat="identity")+
  geom_errorbar(aes(ymin=winglength-sd, ymax=winglength+sd), width=.8)+
  theme_dark()+
  scale_fill_manual(values=c('green',"blue"))



survival_comparison_tarsuslength <- finches %>% group_by(drought_survival) %>% summarise(tarsuslength = mean(tarsus_length_mm), sd = sd(tarsus_length_mm))

head(survival_comparison_tarsuslength)
ggplot(data=survival_comparison_tarsuslength, aes(x = drought_survival, y=tarsuslength,fill=drought_survival))+
  geom_bar(stat="identity")+
  geom_errorbar(aes(ymin=tarsuslength-sd, ymax=tarsuslength+sd), width=.8)+
  theme_dark()+
  scale_fill_manual(values=c('green',"blue"))



survival_comparison_bodymass <- finches %>% group_by(drought_survival) %>% summarise(bodymass = mean(body_mass_g), sd = sd(body_mass_g))
summary(survival_comparison_bodymass)

head(survival_comparison_bodymass)
ggplot(data=survival_comparison_bodymass, aes(x = drought_survival, y=bodymass,fill=drought_survival))+
  geom_bar(stat="identity")+
  geom_errorbar(aes(ymin=bodymass-sd, ymax=bodymass+sd), width=.8)+
  theme_dark()+
  scale_fill_manual(values=c('green',"blue"))

t.test(finches$body_mass_g ~ finches$drought_survival)
t.test(finches$wing_length_mm ~ finches$drought_survival)
t.test(finches$tarsus_length_mm ~ finches$drought_survival)
t.test(finches$beak_depth_mm ~ finches$drought_survival)




survivor <- filter(finches, drought_survival=="survivor")

reg <- lm(survivor$beak_depth_mm ~ survivor$wing_length_mm)
summary(reg)


ggplot(data = survivor, aes(y=wing_length_mm,x=beak_depth_mm ))+
  geom_point(size =3)+
  geom_smooth(method="lm", se = FALSE, color = "red", linetype = "dashed")+
  xlab("beak survivor")+
  ylab("wing length ")
  
  

ggplot(data = finches, aes(y=wing_length_mm,x=body_mass_g ))+
  geom_point(size =3)+
  geom_smooth(method="lm", se = FALSE, color = "red", linetype = "dashed")

ggplot(data = finches, aes(y=beak_depth_mm,x=body_mass_g ))+
  geom_point(size =3)+
  geom_smooth(method="lm", se = FALSE, color = "red", linetype = "dashed")

summary(finches, drought_survival=="survivor")
