
library(dplyr)
library(ggplot2)

#read in air temperature data
global_temp.df  <- read.csv("global_temp_cleaned.csv")
# use annual_temp_c column
# co2 dat set
loa_co2.df <- read.csv("loa_co2_cleaned.csv")

# use the combo data set for part B
# combined data set for last part
combo <- full_join(global_temp.df, loa_co2.df)
combo <- na.omit(combo)
global_temp.df$year
lm_result <- lm(annual_temp_c ~ year, data = global_temp.df)
summary(lm_result)

ggplot(global_temp.df, aes(x=year, y=annual_temp_c)) +
  geom_point(aes(color=annual_temp_c)) +
  geom_smooth(method="lm", se=FALSE, color="red") +  
  labs(x="Year", y="Annual Temperature (°C)") 


filtered_data <- global_temp.df %>% filter(year >= 1955)

ggplot(filtered_data, aes(x=year, y=annual_temp_c)) +
  geom_point(aes(color=annual_temp_c)) +  
  geom_smooth(method="lm", se=FALSE, color="red") +  
  labs(x="Filtered Year", 
       y="Annual Temperature (°C)") 
model <- lm(annual_temp_c ~ year, data=filtered_data)
summary(model)


ggplot(loa_co2.df, aes(x=year, y=annual_co2_ppm)) +
  geom_point(aes(color=annual_co2_ppm)) +  
  geom_smooth(method="lm", se=FALSE, color="red") +  
  labs(x="Year", 
       y="CO2 Level (ppm)") +
  theme_minimal()
  
graph <-lm(annual_co2_ppm ~ year, data=loa_co2.df)
summary(graph)


library(ggplot2)

ggplot(combo, aes(x=annual_co2_ppm, y=annual_temp_c)) +
  geom_point(aes(color=annual_temp_c)) +  
  geom_smooth(method="lm", se=FALSE, color="red") +  
  labs(x="CO2 Concentration (ppm)", 
       y="Annual Temperature (°C)")

model <- lm(annual_temp_c ~ annual_co2_ppm, data=combo)
summary(model)





