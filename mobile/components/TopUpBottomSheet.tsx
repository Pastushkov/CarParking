import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Keyboard, TextInput, View } from "react-native";
import { ProfileService } from "../services/profileService";
import { useRootState } from "../state/rootState";

interface Props {
  topUpRef: any;
}

export const TopUpBottomSheet = ({ topUpRef }: Props) => {
  const [loading, setLoading] = useState(false);

  const { rootState } = useRootState();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<{ amount: string }>({
    mode: "onSubmit",
    defaultValues: {
      amount: "",
    },
  });

  const topUpBalance = async ({ amount }: { amount: string }) => {
    setLoading(true);
    try {
      await ProfileService.topUpBalance({ amount });
      await rootState.fetchMe();
      topUpRef?.current?.close();
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
      setError("amount", {
        message: "Error",
      });
    }
    setLoading(false);
  };

  return (
    <BottomSheet
      ref={topUpRef}
      index={-1}
      snapPoints={["25%", "50%"]}
      enablePanDownToClose={true}
      onClose={() => {
        topUpRef?.current?.close();
      }}
    >
      <BottomSheetView
        style={{
          zIndex: 10000,
        }}
      >
        <View
          style={{
            padding: 20,
          }}
        >
          <Controller
            name="amount"
            control={control}
            rules={{
              required: "Amount is required",
            }}
            render={({ field }) => (
              <TextInput
                id="amount"
                keyboardType="numeric"
                autoFocus
                placeholder="Amount"
                style={{
                  height: 40,
                  borderColor: errors.amount ? "red" : "gray",
                  borderWidth: 1,
                  marginBottom: 10,
                  padding: 5,
                }}
                value={field.value}
                onChangeText={field.onChange}
              />
            )}
          />
          <Button
            disabled={loading}
            title="Top up"
            onPress={handleSubmit(topUpBalance)}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};
