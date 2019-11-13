from keras.models import Sequential
from keras.layers.recurrent import LSTM
from keras.layers.wrappers import TimeDistributed
from keras.layers.core import Dense, RepeatVector

def build_model(input_size, max_out_seq_len, hidden_size):

    model = Sequential()

    # Encoder (first LSTM) model.add (LSTM (input_dim=input_size, output_dim=hidden_size, return_sequences=False)


    model.add( Dense(hidden_size, activation="relu") )

    # Use "RepeatVector" to copy N copies of Encoder's output (last time step) as Decoder's N inputs
    model.add( RepeatVector(max_out_seq_len) )

    # Decoder (second LSTM) 
    model.add( LSTM(hidden_size, return_sequences=True) )

    # TimeDistributed is to ensure consistency between Dense and Decoder
    model.add( TimeDistributed(Dense(output_dim=input_size, activation="linear")) )

    model.compile(loss="mse", optimizer='adam')

    return model